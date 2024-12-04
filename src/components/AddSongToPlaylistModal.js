import React, { useEffect, useState } from 'react';
import { message, Modal, Select } from 'antd';
import { addSongToPlaylist, getAllPlaylists } from '../apis/playlist';
import { convertArray } from '../utils/convertArrayToSelect';
import getUserInfo from '../utils/getUserInfo';

const AddSongToPlaylistModal = ({ songId, isModalOpen, setIsModalOpen }) => {
    const [playlistId, setPlaylistId] = useState('')
    const userInfo = getUserInfo()
    const handleChange = (value) => {
        setPlaylistId(value)
    };

    const handleOk = async () => {
        try {
            const response = await addSongToPlaylist({ songs: [songId], playlistId })
            if (response.data) {
                message.success("Thêm vào danh sách phát thành công!")
                setIsModalOpen(false);
            }
        } catch (error) {
            message.error('Thêm vào thất bại!')
            console.log(error)
        }
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const [playlists, setPlaylist] = useState([]);
    const fetchAllPlaylists = async () => {
        try {
            const response = await getAllPlaylists({ userId: userInfo._id })
            if (response.data) {
                setPlaylist(response.data);
            }
        } catch (error) {
            console.error('Get all playlists error: ', error);
            setPlaylist([]);
        }
    }

    useEffect(() => {
        fetchAllPlaylists()

    }, [])
    return (
        <div><Modal title="Chọn danh sách" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <Select
                placeholder='Chọn danh sách phát'
                style={{
                    width: '100%',
                }}
                onChange={handleChange}
                options={
                    convertArray(playlists)
                }
            />
        </Modal>
        </div>
    )
}

export default AddSongToPlaylistModal