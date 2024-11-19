import SideBar from './components/SideBar';
import { Layout } from 'antd';
import TopBar from './components/TopBar';
import { Outlet } from 'react-router-dom';

const App = () => {
  return (
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
  );
};
export default App;