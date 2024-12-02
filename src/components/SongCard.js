import { Button, Card, message } from 'antd';
import { useNavigate } from "react-router-dom";
import { HeartFilled, HeartOutlined, EllipsisOutlined } from '@ant-design/icons';
import { addFavoriteSong, removeFavoriteSong } from '../apis/favoriteSong';
import { Dropdown } from 'antd';
import getUserInfo from '../utils/getUserInfo';
import { useState } from 'react';
import AddSongToPlaylistModal from './AddSongToPlaylistModal';
const { Meta } = Card;

const SongCard = ({ id, title, imageUrl, isFavorite, fetchAllSongs }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [songId, setSongId] = useState('')
  const navigate = useNavigate();
  const userInfo = getUserInfo()
  const items = [
    {
      label: <Button style={{ padding: 0 }} onClick={() => isFavorite ? handleRemoveFavorite() : handleAddFavorite()}
        icon={isFavorite ? <HeartFilled style={{ color: 'red' }} /> : <HeartOutlined />}
        type='link'>{isFavorite ? 'Bỏ yêu thích' : 'Yêu thích'}
      </Button>,
      key: 'favorite',
    },
    {
      label: <Button style={{ padding: 0 }} onClick={
        () => {
          setIsModalOpen(true)
          setSongId(id)
        }
      }
        type='link'>Thêm vào danh sách phát
      </Button>,
      key: 'playlist',
    }
  ];

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
    <div>
      {isModalOpen &&
        <AddSongToPlaylistModal
          isModalOpen={isModalOpen}
          songId={songId}
          setIsModalOpen={setIsModalOpen} />}
      <Card
        hoverable
        style={{
          width: 150,
          padding: 0
        }}
        cover={<img style={{
          width: 150,
          height: 100,

        }} alt="example" src={`http://localhost:8080/public/images/${imageUrl}`} onClick={() => navigate(`/playsong/${id}`)} />}
      >
        <Meta title={title} />
        {userInfo && userInfo._id &&
          <Dropdown
            menu={{
              items,
            }}
            trigger={['click']}
          >
            <EllipsisOutlined style={{ fontSize: '1.5rem', float: 'right' }} />
          </Dropdown>
        }

      </Card>
    </div>
  )
}
export default SongCard;