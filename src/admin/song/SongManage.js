import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons'
import { Popconfirm, message } from "antd";


const SongManage = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchSongs();
    }, []);

    const fetchSongs = () => {
        fetch('http://localhost:8080/songs')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(responseData => {
                console.log("Dữ liệu từ API:", responseData);
                if (Array.isArray(responseData.data) && responseData.data.length > 0) {
                    setData(responseData.data.map(song => ({ ...song, key: song._id })));
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
    };

    const handleAdd = () => {
        navigate('/admin/addsong');
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/songs/${id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                message.success("Bài hát đã được xóa thành công");
                setData(data.filter(song => song._id !== id));
            } else {
                message.error("Không thể xóa bài hát");
            }
        } catch (error) {
            console.error('Lỗi khi xóa bài hát: ', error);
        }
    };

    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Artist',
            dataIndex: ['artist', '_id'],
            key: 'artist',
        },
        {
            title: 'Stream URL',
            dataIndex: 'streamUrl',
            key: 'streamUrl',
        },
        {
            title: 'Image URL',
            dataIndex: 'imageUrl',
            key: 'imageUrl',
        },
        {
            title: 'Play Count',
            dataIndex: 'playCount',
            key: 'playCount',
        },
        {
            title: 'Actions',
            key: 'action',
            render: (_, record) => (
                <Popconfirm
                    title="Delete the song"
                    description="Are you sure to delete this song?"
                    onConfirm={() => handleDelete(record._id)}
                    okText="Yes"
                    cancelText="No"
                >
                    <DeleteOutlined style={{ fontSize: '1.5rem', color: 'red' }} />
                </Popconfirm>
            ),
        },
    ];

    return (
        <div>
            <Table
                columns={columns}
                dataSource={data}
                loading={loading}

            />
            <div>
                <Button type="primary" onClick={handleAdd}>Add Song</Button>
            </div>
        </div>
    );
};

export default SongManage;
