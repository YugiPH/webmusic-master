import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
                console.log("Bài hát đã được xóa thành công");
                setData(data.filter(song => song._id !== id));
            } else {
                console.error("Không thể xóa bài hát");
            }
        } catch (error) {
            console.error('Lỗi khi xóa bài hát: ', error);
        }
    };

    return (
        <div>
            {loading ? (
                <p>Loading data, please wait...</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Artist</th>
                            <th>Stream URL</th>
                            <th>Image URL</th>
                            <th>Play Count</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length === 0 ? (
                            <tr>
                                <td colSpan="6">No data available...</td>
                            </tr>
                        ) : (
                            data.map((song) => (
                                <tr key={song._id}>
                                    <td>{song.title}</td>
                                    <td>{song.artist.name}</td>
                                    <td>{song.streamUrl}</td>
                                    <td>{song.imageUrl}</td>
                                    <td>{song.playCount}</td>
                                    <td>

                                        <button onClick={() => handleDelete(song._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            )}
            <div style={{ marginTop: '20px' }}>
                <button onClick={handleAdd}>Add Song</button>
            </div>
        </div>
    );
};

export default SongManage;
