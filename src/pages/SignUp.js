import React from 'react';
import { LockOutlined, UserOutlined, GoogleOutlined } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';
import { NavLink, useNavigate } from 'react-router-dom';
import register from '../apis/register';

const SignUp = () => {
    const navigate = useNavigate()
    const onFinish = async (values) => {
        const res = await register(values)
        if (res.ok) {
            message.success("Dang ky thanh cong!")
            navigate('/login')
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
            <h2>Đăng Ký</h2>
            <Form
                name="signUp"
                style={{
                    minWidth: 350,
                }}
                onFinish={onFinish}
            >
                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Username!',
                        },
                    ]}
                >
                    <Input prefix={<UserOutlined />} placeholder="Username" />
                </Form.Item>
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

                <Form.Item>
                    <Button block type="primary" htmlType="submit">
                        Sign up
                    </Button>
                    Đã có tài khoản? <NavLink to="/login">Đăng nhập ngay</NavLink>
                </Form.Item>
            </Form>
        </div>
    );
};
export default SignUp;