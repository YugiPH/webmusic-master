import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import { getGenres } from '../../apis/genre';


const ListGenres = () => {
    const [data, setData] = useState([]);

    const handleGetListGenres = async () => {
        const response = await getGenres()
        if (response.ok) {
            setData(response.data)
        }
    }

    useEffect(() => {
        handleGetListGenres()
    }, []);

    const columns = [
        {
            title: 'Thể loại',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <p>{text}</p>,
        }
    ];

    return (
        <div>
            <Table
                columns={columns}
                dataSource={data}
                rowKey={'_id'}
            />
        </div>
    );
};

export default ListGenres;
