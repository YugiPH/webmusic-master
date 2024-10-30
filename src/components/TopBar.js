import React, { useState, useContext } from 'react';
import SearchInput from './SearchInput';
import Profile from './Profile';
import Logo from './Logo';
import Switch from './Switch';
import { Layout } from 'antd';
import { ThemeContext } from './ThemeContext';

const { Header } = Layout;

const TopBar = () => {
    const [value, setValue] = useState(false);
    const { isDarkMode } = useContext(ThemeContext);
    const themeStyles = {
        background: isDarkMode ? '#333' : '#fff',
        color: isDarkMode ? '#fff' : '#000'
    };

    return (
        <div style={themeStyles}>
            <Header
                style={{
                    padding: 0,
                    background: themeStyles.background,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingLeft: "50px",
                    paddingRight: "50px",
                }}
            >
                <div style={{ flexGrow: '4', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginRight: '100px', marginLeft: '30px', paddingLeft: '300px' }}>
                    <Logo />
                    <SearchInput />
                </div>
                <div style={{ flexGrow: '1', display: 'flex', justifyContent: 'center', marginLeft: '10px', marginRight: '50px', paddingLeft: '70px', paddingRight: '70px' }}>
                    <Switch
                        isOn={value}
                        handleToggle={() => setValue(!value)}
                    />
                </div>
                <div style={{ flexGrow: '1', display: 'flex', justifyContent: 'center' }}>
                    <Profile />
                </div>
            </Header>
        </div>
    );
};

export default TopBar;
