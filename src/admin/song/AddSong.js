import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddSong = () => {
    const navigate = useNavigate();
    const [song, setSong] = useState({
        title: '',
        artistId: '',
        streamUrl: '',
        imageUrl: '',
    });
    const [songFile, setSongFile] = useState(null);
    const [imageFile, setImageFile] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSong(prevSong => ({ ...prevSong, [name]: value }));
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (name === 'songFiles') {
            setSongFile(files[0]);
        } else if (name === 'imageFiles') {
            setImageFile(files[0]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', song.title);
        formData.append('artistId', song.artistId);
        formData.append('songFiles', songFile);
        formData.append('imageFiles', imageFile);

        fetch('http://localhost:8080/songs', {
            method: 'POST',
            body: formData,
        })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(errData => {
                        throw new Error(`Error: ${errData.message || 'Bad Request'}`);
                    });
                }
                return response.json();
            })
            .then(data => {
                console.log('Bài hát đã được thêm:', data);
                navigate('/admin/song');
            })
            .catch(error => {
                console.error('Có lỗi xảy ra khi thêm bài hát:', error);
            });
    };

    const handleCancel = () => {
        navigate('/admin/song');
    };

    const formStyle = {
        display: 'grid',
        gridTemplateColumns: '1fr 5fr',
        gap: '15px',
        alignItems: 'center',
        paddingRight: '70px'
    };

    const labelStyle = { fontWeight: 'bold' };
    const inputStyle = { padding: '5px', fontSize: '1em' };
    const buttonContainerStyle = {
        gridColumn: 'span 2',
        display: 'flex',
        gap: '10px',
        justifyContent: 'center',
        paddingTop: '50px'
    };
    const buttonStyle = { padding: '8px 12px' };

    return (
        <div>
            <h1 style={{ textAlign: 'center' }}> Thêm Bài Hát </h1>
            <form onSubmit={handleSubmit} style={formStyle}>
                <label style={labelStyle}>Title:</label>
                <input type="text" name="title" value={song.title} onChange={handleChange} style={inputStyle} />
                <label style={labelStyle}>Artist ID:</label>
                <input type="text" name="artistId" value={song.artistId} onChange={handleChange} style={inputStyle} />
                <label style={labelStyle}>Stream Url:</label>
                <input type="file" name="songFiles" onChange={handleFileChange} style={inputStyle} />
                <label style={labelStyle}>Image Url:</label>
                <input type="file" name="imageFiles" onChange={handleFileChange} style={inputStyle} />
                <div style={buttonContainerStyle}>
                    <button type="submit" style={buttonStyle}>Save</button>
                    <button type="button" onClick={handleCancel} style={buttonStyle}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default AddSong;
