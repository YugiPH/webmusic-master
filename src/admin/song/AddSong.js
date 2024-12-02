import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Select } from 'antd';
import { convertSelect } from '../../utils/convertArrayToSelect';
import { getAllArtists } from '../../apis/artist'


const AddSong = () => {
    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const [listArtist, setListArtist] = useState([])

    const fetchAllArtists = async () => {
        try {
            const response = await getAllArtists()
            if (response.data) {
                setListArtist(response.data);
            }
        } catch (error) {
            console.error('Get all artists error: ', error);
            setListArtist([]);
        }
    }
    console.log(listArtist)

    useEffect(() => {
        fetchAllArtists()

    }, [])

    return (
        <div style={{ width: '100%' }}>
            <Form
                name="addsong"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                style={{
                    maxWidth: 600,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Tên bài hát"
                    name="title"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập tên bài hát...',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Ca sĩ"
                    name="artistId"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng chọn ca sĩ...',
                        },
                    ]}
                >
                    <Select
                        placeholder='Chọn tên ca sĩ'
                        style={{
                            width: '100%',
                        }}
                        // onChange={handleChange}
                        options={
                            convertSelect(listArtist)
                        }
                    />
                </Form.Item>

                <Form.Item label={null}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default AddSong;
