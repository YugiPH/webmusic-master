import React from 'react';
import { Button, Dropdown } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import logout from '../utils/logout';

const Profile = ({ userInfo }) => {
  const navigate = useNavigate()
  const items = [
    {
      key: 'username',
      label: (
        <h3 style={{ margin: 'auto' }}>{userInfo.username}</h3>
      ),
    },
    {
      key: 'logout',
      label: (
        <Button type='link' onClick={() => {
          logout();
          navigate('/login')
        }}>
          Đăng xuất
        </Button>
      ),
    }
  ];
  return (
    <Dropdown
      menu={{
        items,
      }}
      trigger={['click']}
    >
      <UserOutlined style={{ fontSize: '2rem' }} />
    </Dropdown>
  );
}
export default Profile;