import React from "react";
import SideBar from "./adminComponents/SideBar";
import { Layout } from "antd";

const Admin = () => {
    return (
        <Layout style={{ minHeight: '100vh', display: 'flex' }}>
            <SideBar />
            <Layout style={{ flex: 1, overflow: 'auto' }}>
            </Layout>
        </Layout>
    )
}

export default Admin;
