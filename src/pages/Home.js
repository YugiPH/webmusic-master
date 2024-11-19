import React, { useState, useEffect } from 'react';
import SongCard from '../components/SongCard';
import { Layout } from 'antd';
import getUserInfo from '../utils/getUserInfo';
import { getFavoriteSong } from '../apis/favoriteSong';

const { Content } = Layout;

const Home = () => {
    const [data, setData] = useState([]);
    const [favorite, setFavorite] = useState([]);
    const [loading, setLoading] = useState(true);

    const userInfo = getUserInfo()
    const fetchfavorite = async () => {
        const response = await getFavoriteSong(userInfo._id)
        if (response.data) {
            setFavorite(response.data.favoriteId)
        }
    }
    useEffect(() => {
        fetchfavorite()
        fetch('http://localhost:8080/songs')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(responseData => {
                if (Array.isArray(responseData.data) && responseData.data.length > 0) {
                    setData(responseData.data);
                } else {
                    setData([]);
                }
            })
            .catch(error => {
                console.error('Không thể lấy được dữ liệu: ', error);
                setData([]);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <Content style={{ backgroundColor: "white" }}>
            <div style={{ padding: 24, gap: '1rem', display: 'flex', flexWrap: 'wrap' }}>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    data.map(song => (
                        <SongCard
                            key={song._id}
                            id={song._id}
                            title={song.title}
                            imageUrl={song.imageUrl}
                            favoriteId={song.favoriteId}
                        // isFavorite={}
                        />
                    ))
                )}
            </div>
        </Content>
    );
};

export default Home;
