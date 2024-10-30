import React from 'react';
import { Avatar } from "antd";
import { useNavigate } from 'react-router-dom';
const Logo = () => {
    const navigate = useNavigate();
    const url = "https://www.shutterstock.com/image-vector/note-music-icon-vector-design-260nw-1261030141.jpg"
    return (
        <Avatar
            style={{ cursor: "pointer" }}
            width={50}
            src={<img src={url} alt="avatar" />}
            onClick={() => navigate("/")}
        />
    );
}
export default Logo;