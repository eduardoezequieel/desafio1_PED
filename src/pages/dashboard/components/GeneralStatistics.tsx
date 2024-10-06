import { useEffect, useState } from 'react';
import { NodeItem } from '../../../models';
import Tree from 'react-d3-tree';
import { DashboardService } from '../services';

type GeneralStatisticsType = {
  genders: NodeItem[];
  bloodTypes: NodeItem[];
  bloodPressures: NodeItem[];
};

export const GeneralStatistics = () => {
  const [generalStatistics, setGeneralStatistics] = useState<GeneralStatisticsType>({
    genders: [],
    bloodTypes: [],
    bloodPressures: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      const genders = await DashboardService.getPatientsByEntity({
        entity: 'genders',
      });
      const bloodTypes = await DashboardService.getPatientsByEntity({
        entity: 'bloodTypes',
      });
      const bloodPressures = await DashboardService.getPatientsByEntity({
        entity: 'bloodPressures',
      });

      setGeneralStatistics({
        genders,
        bloodTypes,
        bloodPressures,
      });
    };

    fetchData();
  }, []);

  return (
    <div
      style={{
        height: 'calc(100vh - 100px)',
      }}
      className="relative w-full border border-gray-300 dark:border-neutral-700 rounded-md"
    >
      <h1 className="dark:bg-neutral-900 bg-white text-indigo-700 w-fit absolute top-[-14px] px-2 left-3 dark:text-indigo-300">
        Estadísticas generales
      </h1>
      {generalStatistics.genders.length > 0 && (
        <Tree
          data={{
            name: 'Pacientes',
            children: [
              {
                name: 'Género',
                children: generalStatistics.genders,
              },
              {
                name: 'Tipo de sangre',
                children: generalStatistics.bloodTypes,
              },
              {
                name: 'Presión arterial',
                children: generalStatistics.bloodPressures,
              },
            ],
          }}
          translate={{ x: 800, y: 200 }}
          orientation="vertical"
          pathFunc="straight"
          nodeSize={{ x: 300, y: 300 }}
          separation={{ siblings: 1, nonSiblings: 1 }}
          zoomable={true}
          zoom={0.8}
        />
      )}
    </div>
  );
};
