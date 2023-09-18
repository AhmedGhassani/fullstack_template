import { createBrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Onboarding from '../layouts/Onboarding';
import Dashboard from '../layouts/Dashboard';
import { ProtectedRoute } from '../components/ProtectRoutes';

export const router = createBrowserRouter([
  {
    element: (
      <AuthProvider>
        <Onboarding />
      </AuthProvider>
    ),
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
  {
    path: '/',
    element: (
      <AuthProvider>
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      </AuthProvider>
    ),
    children: [
      {
        path: '',
        element: <h1>Protected Route</h1>,
      },
    ],
  },
]);
