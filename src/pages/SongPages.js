import React, { useState, useEffect } from 'react';
import PlaySong from '../components/PlaySong';
import { useParams } from 'react-router-dom';
import { Avatar } from 'antd';

const SongPages = () => {
    const { id } = useParams();
    const [song, setSong] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:8080/songs/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(responseData => {
                console.log("Dữ liệu từ API:", responseData);
                setSong(responseData.data);
            })
            .catch(error => {
                console.error('Không thể lấy được dữ liệu: ', error);
                setSong(null);
            })
    }, [id]);

    if (!song) return <p>Không tìm thấy bài hát</p>;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
            <div>
                <Avatar
                    src={<img src={song.imageUrl} alt="avatar" />}
                    size={350}
                />
                <h2 style={{ textAlign: 'center' }}>{song.title}</h2>
                <h3 style={{ textAlign: 'center' }}>{song.artist.name}</h3>
            </div>
            <PlaySong url={song.streamUrl} />
        </div>
    );
};

export default SongPages;
