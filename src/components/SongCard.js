import React, { useState } from 'react';
import { Card } from 'antd';
import { useNavigate } from "react-router-dom";
import { HeartFilled } from '@ant-design/icons';
const { Meta } = Card;

const SongCard = ({ id, title, description, imageUrl }) => {
  const navigate = useNavigate();
  const [favorite, setFavorite] = useState(true)

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
      <HeartFilled style={{
        color: favorite ? 'red' : ''
      }} />
    </Card>
  )
}
export default SongCard;