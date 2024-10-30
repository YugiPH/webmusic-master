import React, { useContext } from 'react';
import '../App.css';
import { SunOutlined, MoonOutlined } from '@ant-design/icons';
import { ThemeContext } from './ThemeContext';

const Switch = () => {
    const { isDarkMode, toggleTheme } = useContext(ThemeContext);

    return (
        <>
            <input
                checked={isDarkMode}
                onChange={toggleTheme}
                className="react-switch-checkbox"
                id={`react-switch-new`}
                type="checkbox"
            />
            <label
                style={{ background: isDarkMode && '#8F57D3' }}
                className="react-switch-label"
                htmlFor={`react-switch-new`}
            >
                <span className="react-switch-button">
                    {isDarkMode ? <SunOutlined /> : <MoonOutlined />}
                </span>
            </label>
        </>
    );
};

export default Switch;
