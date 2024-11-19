import React from 'react';
import { LockOutlined, GoogleOutlined } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';
import { NavLink, useNavigate } from 'react-router-dom';
import login from '../apis/login';

const Login = () => {
    const navigate = useNavigate()
    const onFinish = async (values) => {
        const res = await login(values)
        if (res.ok) {
            message.success("Dang nhap thanh cong!")
            localStorage.setItem('userInfo', JSON.stringify(res.data))
            navigate('/')
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
            <h2>Đăng nhập</h2>
            <Form
                name="login"
                initialValues={{
                    remember: true,
                }}
                style={{
                    minWidth: 350
                }}
                onFinish={onFinish}
            >
                <Form.Item
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Email!',
                            type: 'email'
                        },
                    ]}
                >
                    <Input prefix={<GoogleOutlined />} placeholder="Email" />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Password!',
                        },
                    ]}
                >
                    <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
                </Form.Item>

                <NavLink to="/signup">Forgot password</NavLink>

                <Form.Item>
                    <Button block type="primary" htmlType="submit">
                        Log in
                    </Button>
                    or <NavLink to="/signup">Register now!</NavLink>
                </Form.Item>
            </Form>
        </div>
    );
};
export default Login;