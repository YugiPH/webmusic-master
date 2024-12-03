import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MenuFoldOutlined, MenuUnfoldOutlined, PlayCircleOutlined, UserOutlined, HomeOutlined } from '@ant-design/icons';
import { Button, Layout, Menu, theme, Tooltip } from 'antd';
import { Outlet } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

const SideBar = () => {
    const navigate = useNavigate()
    const [collapsed, setCollapsed] = useState(false);
    const { token: { colorBgContainer, borderRadiusLG }, } = theme.useToken();

    return (
        <Layout style={{ height: '100vh' }}>
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                style={{ height: '100vh' }}
            >
                <div className="demo-logo-vertical" />
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['list-song']}
                    items={[
                        {
                            key: 'songs', icon: <PlayCircleOutlined />, label: <p>Bài hát</p>,
                            children: [
                                {
                                    key: 'list-song',
                                    label: <Link to="song">Danh sách bài hát</Link>,
                                },
                                {
                                    key: 'add-songs',
                                    label: <Link to="/admin/addsong">Thêm bài hát</Link>,
                                },
                            ],
                        },
                        {
                            key: 'genres', icon: <PlayCircleOutlined />, label: <p>Thể loại</p>,
                            children: [
                                {
                                    key: 'list-genres',
                                    label: <Link to="genres">Danh sách thể loại</Link>,
                                },
                                {
                                    key: 'add-genre',
                                    label: <Link to="/admin/addgenre">Thêm thể loại</Link>,
                                },
                            ],
                        },
                        { key: 'artist', icon: <UserOutlined />, label: <Link to="/admin/artist">Nghệ Sĩ</Link> },
                    ]}
                />
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}
                >
                    <Tooltip title="Collapse/Expand the bar">
                        <Button
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            onClick={() => setCollapsed(!collapsed)}
                            style={{
                                fontSize: '16px',
                                width: 64,
                                height: 64
                            }}
                        />
                    </Tooltip>
                    <div style={{ flex: 1, textAlign: 'center' }}>
                        <h1 style={{ margin: 0, color: 'black' }}>Welcome Admin!</h1>
                    </div>
                    <div style={{ display: 'flex', gap: '10px', paddingRight: '20px' }}>

                        <HomeOutlined style={{ fontSize: '1.5rem' }} onClick={() => navigate('/')} />

                    </div>
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        height: 'calc(100vh - 64px - 48px)',
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                        overflow: 'auto',
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default SideBar;
