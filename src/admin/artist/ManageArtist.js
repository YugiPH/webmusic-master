import React from 'react'
import { Button, Form, Input, message } from 'antd';
import { addArtist } from '../../apis/artist';

const ManageArtist = () => {
    const [form] = Form.useForm();
    const handleAddArtist = async (name, bio) => {
        const response = await addArtist({ name: name, bio: bio })
        if (response.ok) {
            message.success('Thêm thành công!');
            form.resetFields()

        } else {
            message.error('Thêm tên ca sĩ thất bại!')
        }
    }

    const onFinish = (values) => {
        handleAddArtist(values.name, values.bio)
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div style={{
            width: '100%', height: '100%',
            display: 'flex',
            justifyContent: 'center'
        }}>
            <Form form={form}
                name="Add Artist"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                style={{
                    minWidth: '50%'
                }}

                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Tên ca sĩ"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Nhập tên ca sĩ...',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Mô tả"
                    name="bio"
                    rules={[
                        {
                            message: 'Vui lòng nhập mô tả!',
                        },
                    ]}
                >
                    <Input.TextArea />
                </Form.Item>

                <Form.Item label={null} wrapperCol={{ offset: 8 }}>
                    <Button type="primary" htmlType="submit">
                        Thêm ca sĩ
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default ManageArtist