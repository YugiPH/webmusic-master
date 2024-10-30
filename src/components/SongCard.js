import React from 'react';
import { Card } from 'antd';
import { useNavigate } from "react-router-dom";
const { Meta } = Card;

const SongCard = ({ id, title, description, imageUrl }) => {
  const navigate = useNavigate();

  return (
    <Card onClick={() => navigate(`/playsong/${id}`)}
      hoverable
      style={{
        width: 150
      }}
      cover={<img style={{
        width: 150,
        height: 100,

      }} alt="example" src={`http://localhost:8080/public/images/${imageUrl}`} />}
    >
      <Meta title={title} description={description} />
    </Card>
  )
}
export default SongCard;