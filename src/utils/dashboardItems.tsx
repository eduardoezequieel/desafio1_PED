import { CircleUserRound } from 'lucide-react';
import { SidebarItemProps } from '../components';

export const dashboardItems: SidebarItemProps[] = [
  {
    label: 'Pacientes',
    icon: <CircleUserRound className="mt-[2px]" size={20} />,
    to: '/dashboard/patients',
  },
];
