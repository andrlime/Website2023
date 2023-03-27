import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import DebateTimer from './Components/DebateTimer';
import Error404 from './Components/Error404';
import { VoltorbFlip } from './Components/Experiments/VoltorbFlip';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/timer",
    element: <DebateTimer/>,
  },
  {
    path: "/voltorb",
    element: <VoltorbFlip/>,
  },
  {
    path: "*",
    element: <Error404/>,
  }
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
