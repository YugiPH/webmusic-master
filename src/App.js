import SideBar from './components/SideBar';
import { Layout } from 'antd';
import TopBar from './components/TopBar';
import { Outlet } from 'react-router-dom';
import { SearchProvider } from './context/searchContext';
import { SongProvider } from './context/songContext';

const App = () => {
  return (
    <SearchProvider>
      <SongProvider>
        <Layout
          style={{
            minHeight: '100vh',
          }}
        >
          {/* header */}
          <TopBar />
          <Layout>
            {/* sidebar */}
            <SideBar />

            <Outlet />

          </Layout>
        </Layout>
      </SongProvider>
    </SearchProvider>
  );
};
export default App;