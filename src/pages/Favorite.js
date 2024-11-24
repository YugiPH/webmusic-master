import React, { useEffect, useState } from 'react';
import { Card, message, Spin } from 'antd';
import { useNavigate } from "react-router-dom";
import getUserInfo from '../utils/getUserInfo';
import { getFavoriteId, getFavoriteSongs, removeFavoriteSong } from '../apis/favoriteSong';
import { LoadingOutlined, DeleteOutlined } from '@ant-design/icons';
const { Meta } = Card;

const Favorite = () => {
    const navigate = useNavigate();
    const userInfo = getUserInfo();
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(true)
    const [favoriteId, setFavoriteId] = useState([]);

    const fetchfavoriteId = async () => {
        const response = await getFavoriteId(userInfo._id)
        if (response.data) {
            setFavoriteId(response.data.favoriteId)
            setLoading(false)
        }
    }

    const fetchfavoriteSongs = async () => {
        const response = await getFavoriteSongs(favoriteId)
        if (response.data) {
            setSongs(response.data)
            // console.log(response.data)
        }
    }

    const handleRemoveFavorite = async (id) => {
        const response = await removeFavoriteSong({ userId: userInfo._id, songId: id })
        if (response.ok) {
            message.success('Xoa khoi ds yeu thich thanh cong!');
            fetchfavoriteSongs()
        }
    }

    useEffect(() => {
        fetchfavoriteId()
    }, []);

    useEffect(() => {
        fetchfavoriteSongs()
    }, [loading]);

    if (loading) {
        return (
            <div style={{ backgroundColor: "white", width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Spin indicator={<LoadingOutlined spin />} size="large" />
            </div>
        )
    }

    return (
        <div style={{ backgroundColor: "white", width: '100vw', height: '100vh' }}>
            <div style={{ padding: 24, gap: '1rem', display: 'flex', flexWrap: 'wrap' }}>
                {songs && songs.length > 0 &&
                    songs.map(song => {
                        return (
                            <Card
                                hoverable
                                style={{
                                    width: 150
                                }}
                                cover={<img style={{
                                    width: 150,
                                    height: 100,

                                }} alt="example" src={`http://localhost:8080/public/images/${song.imageUrl}`} onClick={() => navigate(`/playsong/${song._id}`)} />}
                            >
                                <Meta title={song.title} />
                                <DeleteOutlined onClick={() => handleRemoveFavorite(song._id)}
                                    style={{ color: 'red', fontSize: '1.5rem', marginTop: '10px', }} />
                            </Card>
                        )
                    })
                }
            </div>
        </div>
    )
}
export default Favorite;