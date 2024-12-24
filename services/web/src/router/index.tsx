import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

const Dashboard = lazy(() => import('../components/layouts/Dashboard'));
const Landing = lazy(() => import('../components/pages/Landing'));
const Login = lazy(() => import('../components/pages/auth/Login'));
const Register = lazy(() => import('../components/pages/auth/Register'));

const routes = [
  {
    path: '/',
    element: <Dashboard />,
    children: [
      {
        path: '',
        element: <Landing />,
      },
    ],
  },
  {
    path: '/auth',
    children: [
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
