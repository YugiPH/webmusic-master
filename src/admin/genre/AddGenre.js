import React from 'react'
import { Button, Form, Input, message } from 'antd';
import { createGenre } from '../../apis/genre';

const AddGenre = () => {
    const [form] = Form.useForm();
    const handleAddGenre = async (name) => {
        const response = await createGenre({ name: name })
        if (response.ok) {
            message.success('Thêm thành công!');
            form.resetFields()

        } else {
            message.error('Thêm thể loại thất bại!')
        }
    }

    const onFinish = (values) => {
        handleAddGenre(values.name)
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
                name="Add Genre"
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
                    label="Tên thể loại"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Nhập thể loại...',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item label={null} wrapperCol={{ offset: 8 }}>
                    <Button type="primary" htmlType="submit">
                        Thêm thể loại
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default AddGenre