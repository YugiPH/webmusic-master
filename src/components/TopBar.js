
import SearchInput from './SearchInput';
import Profile from './Profile';
import Logo from './Logo';
import { Layout, Button } from 'antd';
import getUserInfo from '../utils/getUserInfo';
import { useNavigate } from 'react-router-dom';

const { Header } = Layout;

const TopBar = () => {
    const userInfo = getUserInfo()
    const navigate = useNavigate()

    return (

        <Header
            style={{
                padding: 0,
                background: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                maxWidth: '100%'
            }}
        >

            <div style={{ display: 'flex', alignItems: 'center', flex: '1', justifyContent: 'space-between', marginLeft: '50px', paddingRight: '200px' }}>
                <Logo />
                <SearchInput />

            </div>
            <div>

                {userInfo && userInfo._id ?
                    <Profile userInfo={userInfo} />
                    : <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Button type='link' onClick={() => navigate('/login')}>Đăng nhập</Button>
                        <Button type='link' onClick={() => navigate('/signup')}>Đăng ký</Button>
                    </div>
                }

            </div>
        </Header>

    );
};

export default TopBar;
