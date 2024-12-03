import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import { DeleteOutlined } from '@ant-design/icons'
import { Popconfirm, message } from "antd";


const SongManage = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);

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

    const handleDelete = async (id, imagePublicId, streamPublicId) => {
        try {
            const response = await fetch(`http://localhost:8080/songs/${id}`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'DELETE',
                body: JSON.stringify({ imagePublicId, streamPublicId })
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
            dataIndex: ['artist', 'name'],
            key: 'artist',
        },
        {
            title: 'Actions',
            key: 'action',
            render: (_, record) => (
                <Popconfirm
                    title="Delete the song"
                    description="Are you sure to delete this song?"
                    onConfirm={() => handleDelete(record._id, record.imagePublicId, record.streamPublicId)}
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
                rowKey={'_id'}

            />
        </div>
    );
};

export default SongManage;
