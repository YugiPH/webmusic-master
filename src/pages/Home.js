import React, { useState, useEffect } from 'react';
import SongCard from '../components/SongCard';
import { Layout } from 'antd';
import getUserInfo from '../utils/getUserInfo';
import { getFavoriteId } from '../apis/favoriteSong';
import { isSubset } from '../utils/compareArray';
import getAllSongs from '../apis/getAllSongs';

const { Content } = Layout;

const Home = () => {
    const [data, setData] = useState([]);
    const [favoriteUser, setFavoriteUser] = useState([]);
    const [loading, setLoading] = useState(true);

    const userInfo = getUserInfo();

    const fetchfavorite = async () => {
        const response = await getFavoriteId(userInfo._id)
        if (response.data) {
            setFavoriteUser(response.data.favoriteId)
        }
    }

    const fetchAllSongs = async () => {
        try {
            const response = await getAllSongs()
            if (response.data) {
                setData(response.data);
            }
        } catch (error) {
            console.error('Get all songs error: ', error);
            setData([]);
        } finally {
            setLoading(false);
        };
    }
    useEffect(() => {
        if (userInfo)
            fetchfavorite()
        fetchAllSongs()
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
                            isFavorite={isSubset(favoriteUser, song.favoriteId)}
                            fetchAllSongs={fetchAllSongs}
                        />
                    ))
                )}
            </div>
        </Content>
    );
};

export default Home;
