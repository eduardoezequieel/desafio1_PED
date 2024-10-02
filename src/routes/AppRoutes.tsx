import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import cookies from 'js-cookie';
import SignInPage from '../pages/sign-in';
import { User } from '../interfaces';
import { useAuthStore } from '../store';
import DashboardPage from '../pages/dashboard';
import { useEffect } from 'react';
import PatientsPage from '../pages/dashboard/patients';

const PrivateRoute = ({ element }: { element: React.ReactNode }) => {
  const { setSignedUser } = useAuthStore();
  const signedUser: User | null = JSON.parse(cookies.get('signedUser') || 'null');

  useEffect(() => {
    setSignedUser(signedUser);
  }, []);

  if (!signedUser) {
    return <Navigate to="/signIn" />;
  }

  return <>{element}</>;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/signIn" replace />,
  },
  {
    path: '/signIn',
    element: <SignInPage />,
  },
  {
    path: '/dashboard',
    element: <PrivateRoute element={<DashboardPage />} />,
    children: [
      {
        index: true,
        element: <Navigate to="patients" />,
      },
      {
        element: <PatientsPage />,
        path: 'patients',
      },
    ],
  },
]);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
