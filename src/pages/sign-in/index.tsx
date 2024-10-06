import { Navigate } from 'react-router-dom';
import { User } from '../../models';
import { SignInForm } from './components';
import cookies from 'js-cookie';
import { useAuthStore } from '../../store';
import { useEffect } from 'react';

const SignInPage = () => {
  const signedUser: User | null = JSON.parse(cookies.get('signedUser') || 'null');
  const { setSignedUser } = useAuthStore();

  useEffect(() => {
    setSignedUser(signedUser);
  }, []);

  if (signedUser) return <Navigate to="/dashboard" />;

  return <SignInForm />;
};

export default SignInPage;
