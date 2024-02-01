import './index.css'
import "./fonts/inter.css";

import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouteObject, RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './layout'
import { SnortContext } from '@snort/system-react'
import { NostrSystem } from '@snort/system'
import Room from './room'
import { setLogLevel } from 'livekit-client'
import { DefaultRelays } from './const'
import RoomList from './room-list'
import { Login, loadSession } from './login';

const routes = [
  {
    element: <Layout />,
    loader: async () => {
      return null;
    },
    children: [
      {
        path: "/",
        element: <>
          <RoomList />
        </>
      },
      {
        path: "/room/:id",
        element: <Room />
      }
    ]
  }

] as Array<RouteObject>;
const router = createBrowserRouter(routes);

const snortSystem = new NostrSystem({});
DefaultRelays.forEach(r => snortSystem.ConnectToRelay(r, { read: true, write: true }));

setLogLevel("debug");

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SnortContext.Provider value={snortSystem} >
      <Login.Provider value={loadSession() || {}}>
        <RouterProvider router={router} />
      </Login.Provider>
    </SnortContext.Provider>
  </React.StrictMode>,
)
