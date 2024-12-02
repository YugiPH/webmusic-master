import React, { useEffect, useState } from 'react'
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Card, Input, message, Modal } from 'antd'
import { createPlaylist, getAllPlaylists } from '../apis/playlist';
import { useNavigate } from 'react-router-dom';

const actions = [
    <EditOutlined key="edit" />,
    <DeleteOutlined key="delete" />,
];

const PlayList = () => {
    const navigate = useNavigate()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        handleCreatePlaylist();
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const [playlists, setPlaylist] = useState([]);
    const [title, setTitle] = useState('');

    const fetchAllPlaylists = async () => {
        try {
            const response = await getAllPlaylists()
            if (response.data) {
                setPlaylist(response.data);
            }
        } catch (error) {
            console.error('Get all playlists error: ', error);
            setPlaylist([]);
        }
    }

    const handleCreatePlaylist = async () => {
        try {
            const response = await createPlaylist({ title })
            if (response.data) {
                message.success("Tao danh sach phat moi thanh cong!")
                fetchAllPlaylists()
                setIsModalOpen(false);
            }
        } catch (error) {
            console.error('Create error: ', error);
        }
    }


    useEffect(() => {
        fetchAllPlaylists()
    }, []);

    return (
        <div>

            <Button onClick={showModal}
                icon={<PlusOutlined />}
            >
                Tạo danh sách phát
            </Button>
            <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Input value={title}
                    onChange={(e) => setTitle(e.target.value)} />
            </Modal>

            {playlists && playlists.length > 0 && playlists.map(playlist => {
                return (
                    <Card
                        key={playlist._id}
                        actions={actions}
                        style={{
                            minWidth: 300,
                        }}
                    >
                        <Card.Meta onClick={() => navigate(`/playlist/${playlist._id}`)}
                            title={playlist.title}
                            style={{ cursor: 'pointer' }}
                        />
                    </Card>
                )
            })}
        </div >
    )
}

export default PlayList