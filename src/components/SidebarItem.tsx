import clsx from 'clsx';
import { NavLink } from 'react-router-dom';

export type SidebarItemProps = {
  icon: React.ReactNode;
  label: string;
  to: string;
};

export const SidebarItem = ({ icon, label, to }: SidebarItemProps) => {
  return (
    <NavLink to={to}>
      {({ isActive }) => (
        <button
          type="button"
          className={clsx(
            'w-full dark:text-white text-dark hover:bg-indigo-500/30 hover:scale-105 transition-all rounded-sm px-3 py-2 flex gap-4',
            {
              'bg-indigo-500 hover:!bg-indigo-500 text-white': isActive,
            }
          )}
        >
          {icon}
          <span>{label}</span>
        </button>
      )}
    </NavLink>
  );
};
