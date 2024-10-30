import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MenuFoldOutlined, MenuUnfoldOutlined, PlayCircleOutlined, OrderedListOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { Button, Layout, Menu, theme, Tooltip } from 'antd';
import { Outlet } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

const SideBar = () => {
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
                    defaultSelectedKeys={['1']}
                    items={[
                        { key: '1', icon: <PlayCircleOutlined />, label: <Link to="song">Bài Hát</Link> },
                        { key: '2', icon: <OrderedListOutlined />, label: <Link to="/admin/nav2">Nav 2</Link> },
                        { key: '3', icon: <UserOutlined />, label: <Link to="/admin/nav3">Nghệ Sĩ</Link> },
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
                        <Tooltip title="Log out">
                            <Button type="text" style={{ height: '50px', width: '50px', }}>
                                <LogoutOutlined />
                            </Button>
                        </Tooltip>
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
