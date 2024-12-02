import React, { useEffect, useRef, useState } from 'react'
import { getPlaylistById, removeSongFromPlaylist } from '../apis/playlist';
import { Avatar, List, message } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { DeleteOutlined } from '@ant-design/icons';
import ReactAudioPlayer from 'react-audio-player';

const DetailPlaylist = () => {
    const navigate = useNavigate()
    const params = useParams();
    const { id } = params
    const [listSongs, setListSongs] = useState('')

    const [currentSong, setCurrentSong] = useState({
        title: '',
        imageUrl: '',
        streamUrl: ''
    })

    const fetchPlaylistById = async () => {
        try {
            const response = await getPlaylistById(id)
            if (response.data) {
                setListSongs(response.data.songs);
                setCurrentSong(response.data.songs[0])
                if (response.data.songs.length === 0) {
                    navigate('/playlist')
                }
            }
        } catch (error) {
            console.error('Get playlists error: ', error);
            setListSongs([]);
        }
    }

    const removeSong = async (songId, playlistId) => {
        try {
            const response = await removeSongFromPlaylist({ songId, playlistId })
            if (response.data) {
                message.success("Xóa khỏi danh sách thành công!")
                fetchPlaylistById()
            }
        } catch (error) {
            console.error('Xóa thất bại! ', error);
        }
    }

    useEffect(() => {
        fetchPlaylistById()
    }, [])


    return (
        <div style={{ display: 'flex', width: '100%', height: '100%', backgroundColor: 'white' }}>
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                <Avatar
                    src={<img src={`http://localhost:8080/public/images/${currentSong.imageUrl}`} alt="avatar" />}
                    size={400}
                />
                <h2>{currentSong.title}</h2>
                <ReactAudioPlayer
                    style={{ width: '100%' }}
                    src={`http://localhost:8080/public/songs/${currentSong.streamUrl}`}
                    autoPlay
                    controls
                    onEnded={() => {
                        const currentIndex = listSongs.findIndex(song => song.title === currentSong.title);
                        if (currentIndex < listSongs.length - 1) {
                            setCurrentSong(listSongs[currentIndex + 1]);
                        }
                    }}
                />
            </div>
            <List style={{ width: '40%', border: '1px solid #f0f0f0', borderRadius: '10px', backgroundColor: 'white' }}
                itemLayout="horizontal"
                dataSource={listSongs}
                renderItem={(item, index) => (
                    <List.Item onClick={() => setCurrentSong(item)} style={{ cursor: 'pointer', padding: '0 30px' }}>
                        <List.Item.Meta
                            title={<p>{item.title}</p>}
                        />
                        <DeleteOutlined onClick={() => removeSong(item._id, id)} style={{ fontSize: '1.2rem', color: 'red' }} />
                    </List.Item>
                )}
            />
        </div>
    )
}

export default DetailPlaylist