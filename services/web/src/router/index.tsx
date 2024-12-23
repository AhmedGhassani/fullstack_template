import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

const Landing = lazy(() => import('../components/pages/Landing'));
const Login = lazy(() => import('../components/pages/Auth/Login'));
const Register = lazy(() => import('../components/pages/Auth/Register'));

export enum Routes {
  Landing = '/',
  Login = '/auth/login',
  Register = '/auth/register',
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Landing />,
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
]);

export default router;
