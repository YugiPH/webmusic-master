import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Admin from './Admin';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// import user
import ProfilePage from './pages/ProfilePage';
import SignUp from './pages/SignUp';
import SongPages from './pages/SongPages';
import Login from './pages/Login';
import Home from './pages/Home';
import Favorite from './pages/Favorite';
import Categories from './pages/Categories';
import CategoryDetail from './pages/CategoryDetail';
import PlayList from './pages/PlayList';

// import admin
import AdminPortal from './admin/AdminPortal';
import SongManage from './admin/song/SongManage';
import AddSong from './admin/song/AddSong';
import EditSong from './admin/song/EditSong';
import DetailPlaylist from './pages/DetailPlaylist';
import ManageArtist from './admin/artist/ManageArtist';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "profile",
        element: <ProfilePage />
      },
      {
        path: "playsong/:id",
        element: <SongPages />
      },
      {
        path: "favorite",
        element: <Favorite />
      },
      {
        path: "playlist/:id",
        element: <DetailPlaylist />
      },
      {
        path: "playlist",
        element: <PlayList />
      },
      {
        path: "categories",
        element: <Categories />,
        children: [
          {
            path: ":categoryId",
            element: <CategoryDetail />
          },
        ]
      }
    ]
  },

  {
    path: "/signup",
    element: <SignUp />
  },

  {
    path: "/login",
    element: <Login />
  },

  {
    path: "/admin",
    element: <Admin />,
    children:
      [
        {
          index: true,
          element: <AdminPortal />
        },
        {
          path: 'song',
          element: <SongManage />
        },
        {
          path: 'addsong',
          element: <AddSong />
        },
        {
          path: 'editsong',
          element: <EditSong />
        },
        {
          path: 'artist',
          element: <ManageArtist />
        },
      ]
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
