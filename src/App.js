import SideBar from './components/SideBar';
import { Layout } from 'antd';
import TopBar from './components/TopBar';
import { Outlet } from 'react-router-dom';
import { ThemeProvider } from './components/ThemeContext';

const App = () => {
  return (
    <ThemeProvider>
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
    </ThemeProvider>
  );
};
export default App;