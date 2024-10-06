import { Outlet } from 'react-router-dom';
import { Sidebar } from '../../components';

const DashboardLayout = () => {
  return (
    <>
      <Sidebar />
      <div className="w-full pl-[230px] bg-white dark:bg-neutral-900 min-h-screen h-full overflow-y-auto">
        <div className="p-5">
          <Outlet />
        </div>
      </div>
    </>
  );
};
export default DashboardLayout;
