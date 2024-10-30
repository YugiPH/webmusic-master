import React, { useState, useContext } from 'react';
import { Layout, Menu } from 'antd';
import {
  HeartOutlined,
  HomeOutlined,
  AppstoreOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from './ThemeContext';

const { Sider } = Layout;

const SideBar = () => {

  const { isDarkMode } = useContext(ThemeContext);
  const themeStyles = {
    background: isDarkMode ? '#333' : '#fff',
    color: isDarkMode ? '#fff' : '#000'
  };

  const navigate = useNavigate();

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
    getItem('Bài hát yêu thích', '/favorite', <HeartOutlined />),
    getItem('Danh sách phát', '/playlist', <UnorderedListOutlined />),
    getItem('Khám phá', 'sub1', <AppstoreOutlined />, [
      getItem('Thể loại', '/categories'),
      getItem('Bảng xếp hạng', '/top'),
    ]),
  ];
  return (
    <div style={themeStyles}>
      <Sider
        theme={isDarkMode ? 'dark' : 'light'}
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <Menu
          theme={isDarkMode ? 'dark' : 'light'}
          defaultSelectedKeys={['/']}
          mode="inline"
          items={items}
          style={{ height: '100%' }}
          onClick={(e) => navigate(e.key)}
          className={isDarkMode ? 'menu-item-dark' : 'menu-item-light'}
        />
      </Sider>

    </div>
  )
}

export default SideBar;

