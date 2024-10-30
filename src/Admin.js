import React from "react";
import SideBar from "./adminComponents/SideBar";
import { Layout } from "antd";
import { Outlet } from 'react-router-dom';
import { ThemeProvider } from "./components/ThemeContext";

const Admin = () => {
    return (
        <ThemeProvider>
            <Layout style={{ minHeight: '100vh', display: 'flex' }}>
                <SideBar />
                <Layout style={{ flex: 1, overflow: 'auto' }}>
                </Layout>
            </Layout>
        </ThemeProvider>
    )
}

export default Admin;
