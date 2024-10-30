import React from 'react';
import { AudioOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';
const { Search } = Input;
const SearchInPut = () => {
    const onSearch = (value) => console.log(value);
    return (
        <Search placeholder="what song do you want to play?" onSearch={onSearch}
            style={{
                width: "600px",
            }}
        />
    )
}

export default SearchInPut;