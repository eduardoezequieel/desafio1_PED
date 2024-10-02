import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import AppRoutes from './routes/AppRoutes';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const preferredColorScheme = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
    setTheme(preferredColorScheme);

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);
  return (
    <>
      <AppRoutes />
      <ToastContainer position="bottom-right" theme={theme} />
    </>
  );
};

export default App;
