import { useAuthStore } from '../../../store';
import { Counter } from './Counter';
import { GeneralStatistics } from './GeneralStatistics';
import { StatisticByEntity } from './StatisticByEntity';

export const DashboardManagement = () => {
  const { signedUser } = useAuthStore();
  return (
    <div className="flex gap-5 flex-col">
      <h1 className="text-2xl text-indigo-700 dark:text-indigo-300">
        Bienvenido {signedUser?.username}
      </h1>
      <h5 className="text-lg dark:text-white text-black">
        Porcentaje de tipos de sangre en El Salvador
      </h5>
      <div className="grid grid-cols-2 gap-3">
        <Counter title="Tipo O" data="63%" />
        <Counter title="Tipo A" data="24%" />
        <Counter title="Tipo B" data="11%" />
        <Counter title="Tipo AB" data="2%" />
      </div>
      <GeneralStatistics />
      <StatisticByEntity entity="genders" />
      <StatisticByEntity entity="bloodTypes" />
      <StatisticByEntity entity="bloodPressures" />
    </div>
  );
};
