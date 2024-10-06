import { CircleUserRound, Gauge } from 'lucide-react';
import { SidebarItemProps } from '../components';

export const dashboardItems: SidebarItemProps[] = [
  {
    label: 'Inicio',
    icon: <Gauge className="mt-[2px]" size={20} />,
    to: '/dashboard/home',
  },
  {
    label: 'Pacientes',
    icon: <CircleUserRound className="mt-[2px]" size={20} />,
    to: '/dashboard/patients',
  },
];
