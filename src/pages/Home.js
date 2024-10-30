import React, { useState, useEffect } from 'react';
import SongCard from '../components/SongCard';
import { Layout } from 'antd';

const { Content } = Layout;

const Home = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:8080/songs') // Thay URL này bằng URL thực tế của API
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(responseData => {
                console.log("Dữ liệu từ API:", responseData);
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

                        />
                    ))
                )}
            </div>
        </Content>
    );
};

export default Home;
