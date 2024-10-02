import { LogOut } from 'lucide-react';
import { useAuthStore } from '../store';
import { dashboardItems } from '../utils';
import { SidebarItem } from './SidebarItem';
import cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

export const Sidebar = () => {
  const { signedUser } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    cookies.remove('signedUser');
    navigate('/signIn');
  };

  return (
    <div className="p-5 flex flex-col justify-between w-[230px] border-r-[1px] bg-white dark:bg-neutral-900 border-gray-300 dark:border-gray-800 fixed h-screen">
      <div className="flex flex-col">
        <div className="flex gap-2 border-indigo-500 border w-fit px-3 py-2 rounded-sm">
          <span className="dark:text-white text-black">{signedUser?.username}</span>
        </div>
        <div className="flex flex-col gap-3 justify-center mt-5">
          {dashboardItems.map((item) => (
            <SidebarItem label={item.label} to={item.to} key={item.label} icon={item.icon} />
          ))}
        </div>
      </div>
      <button
        onClick={handleLogout}
        type="button"
        className="w-full dark:text-white text-dark hover:bg-indigo-500/30 hover:scale-105 transition-all rounded-sm px-3 py-2 flex gap-4"
      >
        <LogOut className="mt-[2px]" size={20} />
        <span>Cerrar sesión</span>
      </button>
    </div>
  );
};
