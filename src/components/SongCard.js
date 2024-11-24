import { Card, message } from 'antd';
import { useNavigate } from "react-router-dom";
import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { addFavoriteSong, removeFavoriteSong } from '../apis/favoriteSong';
import getUserInfo from '../utils/getUserInfo';
const { Meta } = Card;

const SongCard = ({ id, title, imageUrl, isFavorite, fetchAllSongs }) => {
  const navigate = useNavigate();
  const userInfo = getUserInfo()

  const handleRemoveFavorite = async () => {
    const response = await removeFavoriteSong({ userId: userInfo._id, songId: id })
    if (response.ok) {
      message.success('Xoa khoi ds yeu thich thanh cong!');
      fetchAllSongs()
    }
  }

  const handleAddFavorite = async () => {
    const response = await addFavoriteSong({ userId: userInfo._id, songId: id })
    if (response.ok) {
      message.success('Them vao yeu thich thanh cong!');
      fetchAllSongs()
    }
  }

  return (
    <Card
      hoverable
      style={{
        width: 150
      }}
      cover={<img style={{
        width: 150,
        height: 100,

      }} alt="example" src={`http://localhost:8080/public/images/${imageUrl}`} onClick={() => navigate(`/playsong/${id}`)} />}
    >
      <Meta title={title} />
      {userInfo && userInfo._id && isFavorite ?
        <HeartFilled onClick={() => handleRemoveFavorite()}
          style={{
            fontSize: '1.5rem',
            marginTop: '10px',
            color: 'red'
          }} />
        : userInfo && userInfo._id &&
        <HeartOutlined onClick={() => handleAddFavorite()}
          style={{ fontSize: '1.5rem', marginTop: '10px', }} />
      }

    </Card>
  )
}
export default SongCard;