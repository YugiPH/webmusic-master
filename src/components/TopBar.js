import Profile from './Profile';
import Logo from './Logo';
import { Layout, Button, Input, Flex } from 'antd';
import getUserInfo from '../utils/getUserInfo';
import { useNavigate } from 'react-router-dom';
import { searchSong } from '../apis/song';
import { useSearch } from '../context/searchContext';
import { useGetSongBySearch } from '../context/songContext';

const { Header } = Layout;

const TopBar = () => {
    const userInfo = getUserInfo()
    const navigate = useNavigate()
    const { search, setSearch } = useSearch();
    const { setSong } = useGetSongBySearch();

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };


    const handleClick = async () => {
        const response = await searchSong({ title: search })
        if (response.ok) {
            setSong(response.data)
            navigate('/search')
        }
    }

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
                <Flex style={{ width: '80%' }}>
                    <Input value={search} onChange={(e) => handleSearchChange(e)} onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleClick()
                        }
                    }} />
                    <Button onClick={() => handleClick()}>Tìm kiếm</Button>
                </Flex>
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
