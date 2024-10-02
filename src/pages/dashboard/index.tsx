import { Outlet } from 'react-router-dom';
import { Sidebar } from '../../components';

const DashboardPage = () => {
  return (
    <>
      <Sidebar />
      <div className="w-full pl-[230px] bg-white dark:bg-neutral-900 h-screen">
        <div className="p-5">
          <Outlet />
        </div>
      </div>
    </>
  );
};
export default DashboardPage;
