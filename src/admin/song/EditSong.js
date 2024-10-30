import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddSong = () => {
    const navigate = useNavigate();
    const [song, setSong] = useState({
        title: '',
        artist: '',
        album: '',
        genre: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSong(prevSong => ({
            ...prevSong,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Song added:', song);

    };

    const handleCancel = () => {
        navigate('/admin/song')
    };

    const formStyle = {
        display: 'grid',
        gridTemplateColumns: '1fr 5fr',
        gap: '15px',
        alignItems: 'center',
        paddingRight: '70px'
    };

    const labelStyle = {
        fontWeight: 'bold'
    };

    const inputStyle = {
        padding: '5px',
        fontSize: '1em',

    };

    const buttonContainerStyle = {
        gridColumn: 'span 2',
        display: 'flex',
        gap: '10px',
        justifyContent: 'center',
        paddingTop: '50px'
    };

    const buttonStyle = {
        padding: '8px 12px',
    };

    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>
                Sửa Bài Hát
            </h1>
            <form onSubmit={handleSubmit} style={formStyle}>
                <label style={labelStyle}>Title:</label>
                <input type="text" name="title" value={song.title} onChange={handleChange} style={inputStyle} />
                <label style={labelStyle}>Artist:</label>
                <input type="text" name="artist" value={song.artist} onChange={handleChange} style={inputStyle} />
                <label style={labelStyle}>Album:</label>
                <input type="text" name="album" value={song.album} onChange={handleChange} style={inputStyle} />
                <label style={labelStyle}>Genre:</label>
                <input type="text" name="genre" value={song.genre} onChange={handleChange} style={inputStyle} />
                <div style={buttonContainerStyle}>
                    <button type="submit" style={buttonStyle}>Save</button>
                    <button type="button" onClick={handleCancel} style={buttonStyle}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default AddSong;
