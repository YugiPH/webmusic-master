import React, { useEffect, useState } from 'react';
import { Layout, Menu } from 'antd';
import {
  HeartOutlined,
  HomeOutlined, PicLeftOutlined,
  UnorderedListOutlined, PlusSquareOutlined
} from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import getUserInfo from '../utils/getUserInfo';

const { Sider } = Layout;

const SideBar = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const userInfo = getUserInfo()


  const [collapsed, setCollapsed] = useState(false);

  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }
  const items = [
    getItem('Trang chủ', '/', <HomeOutlined />),
    getItem('Thể loại', '/categories', <PicLeftOutlined />),
  ];

  if (userInfo) {
    items.push(
      getItem('Bài hát yêu thích', '/favorite', <HeartOutlined />),
      getItem('Danh sách phát', '/playlist', <UnorderedListOutlined />),
      getItem('Thêm bài hát', '/top', <PlusSquareOutlined />)
    );
  }
  const [selectedKey, setSelectedKey] = useState(location.pathname);

  useEffect(() => {
    setSelectedKey(location.pathname);
  }, [location.pathname]);

  return (
    <div >
      <Sider
        style={{ height: '100vh' }}
        theme={'light'}
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <Menu
          theme={'light'}
          selectedKeys={[selectedKey]}
          mode="inline"
          items={items}
          style={{ height: '100%' }}
          onClick={(e) => navigate(e.key)}
        />
      </Sider>

    </div>
  )
}

export default SideBar;

