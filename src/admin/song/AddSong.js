import React, { useState, useEffect } from 'react';
import { Button, Form, Input, message, Select, Spin, Upload } from 'antd';
import { convertSelect } from '../../utils/convertArrayToSelect';
import { getAllArtists } from '../../apis/artist'
import { UploadOutlined } from '@ant-design/icons';
import { getGenres } from '../../apis/genre';
import axios from 'axios';


const AddSong = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false)

    const onFinish = (values) => {
        setLoading(true)
        const imageFile = values.imagefile.fileList[0].originFileObj;
        const songFile = values.songfile.fileList[0].originFileObj;
        const formData = new FormData();
        formData.append('imagefile', imageFile)
        formData.append('songfile', songFile)
        formData.append('title', values.title);
        formData.append('artistId', values.artistId);
        formData.append('genre', values.genre);

        axios({
            method: "post",
            url: "http://localhost:8080/songs",
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then(function (response) {
                //handle success
                if (response.data.ok === true) {
                    message.success("Thêm bài hát thành công!")
                    setLoading(false)
                    form.resetFields()
                }
            })
            .catch(function (response) {
                //handle error
                console.log(response);
            });

    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const [listArtist, setListArtist] = useState([])
    const [listGenre, setListGenre] = useState([])

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

    const fetchAllGenres = async () => {
        try {
            const response = await getGenres()
            if (response.data) {
                setListGenre(response.data);
            }
        } catch (error) {
            console.error('Get all artists error: ', error);
            setListGenre([]);
        }
    }

    useEffect(() => {
        fetchAllArtists()
        fetchAllGenres()
    }, [])

    const propSong = {
        beforeUpload(file) {
            const isAudio = file.type === "audio/mpeg" || file.type === "audio/wav";
            if (!isAudio) {
                message.error("Chỉ chấp nhận file định dạng .mp3 hoặc .wav");
                return Upload.LIST_IGNORE; // Bỏ qua file không hợp lệ
            }
            message.success(`${file.name} đã chọn thành công!`);
            return false; // Ngăn không cho tải lên tự động
        },
    };

    const propImage = {
        beforeUpload(file) {
            const isImage = file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/gif";
            if (!isImage) {
                message.error("Chỉ chấp nhận file định dạng .jpg, .png, hoặc .gif");
                return Upload.LIST_IGNORE; // Bỏ qua file không hợp lệ
            }
            message.success(`${file.name} đã chọn thành công!`);
            return false; // Ngăn không cho tải lên tự động
        },
    };

    return (
        <div style={{ width: '100%' }}>
            <Spin spinning={loading}>
                <Form form={form}
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
                            options={
                                convertSelect(listArtist)
                            }
                        />
                    </Form.Item>

                    <Form.Item
                        label="Thể loại"
                        name="genre"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng chọn thể loại...',
                            },
                        ]}
                    >
                        <Select
                            placeholder='Chọn thể loại'
                            style={{
                                width: '100%',
                            }}
                            options={
                                convertSelect(listGenre)
                            }
                        />
                    </Form.Item>

                    <Form.Item
                        label="Chọn ảnh bài hát"
                        name="imagefile"
                        rules={[
                            {
                                required: true,
                                message: 'Vui chọn ảnh cho bài hát...',
                            },
                        ]}
                    >
                        <Upload {...propImage}>
                            <Button icon={<UploadOutlined />}>Chọn ảnh bài hát</Button>
                        </Upload>
                    </Form.Item>
                    <Form.Item
                        label="Chọn file bài hát"
                        name="songfile"
                        rules={[
                            {
                                required: true,
                                message: 'Vui chọn file cho bài hát...',
                            },
                        ]}
                    >
                        <Upload {...propSong}>
                            <Button icon={<UploadOutlined />}>Chọn file bài hát</Button>
                        </Upload>
                    </Form.Item>

                    <Form.Item label={null} wrapperCol={{ offset: 8 }}>
                        <Button type="primary" htmlType="submit">
                            Thêm bài hát
                        </Button>
                    </Form.Item>
                </Form>
            </Spin>
        </div>
    );
};

export default AddSong;
