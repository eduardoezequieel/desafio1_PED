import { useEffect, useState } from 'react';
import { NodeItem } from '../../../models';
import Tree from 'react-d3-tree';
import { DashboardService } from '../services';

type Props = {
  entity: 'genders' | 'bloodTypes' | 'bloodPressures';
};

export const StatisticByEntity = ({ entity }: Props) => {
  const [patientsByEntity, setPatientsByEntity] = useState<NodeItem[]>([]);
  const title = {
    genders: 'Género',
    bloodTypes: 'Tipo de sangre',
    bloodPressures: 'Presión arterial',
  }[entity];

  useEffect(() => {
    const fetchData = async () => {
      const response = await DashboardService.getPatientsByEntity({
        entity,
      });
      setPatientsByEntity(response);
    };

    fetchData();
  }, [entity]);

  return (
    <div className="relative w-full h-[700px] border border-gray-300 dark:border-neutral-700 rounded-md">
      <h1 className="dark:bg-neutral-900 bg-white text-indigo-700 w-fit absolute top-[-14px] px-2 left-3 dark:text-indigo-300">
        {
          {
            genders: 'Pacientes clasificados por género',
            bloodTypes: 'Pacientes por tipo de sangre',
            bloodPressures: 'Pacientes por presión arterial',
          }[entity]
        }
      </h1>
      {patientsByEntity.length > 0 && (
        <Tree
          data={{
            name: title,
            children: patientsByEntity,
          }}
          translate={{ x: 500, y: 200 }}
          pathFunc="straight" // You can change the path style (e.g., straight, diagonal)
          nodeSize={{ x: 200, y: 200 }} // Control node size
          separation={{ siblings: 1, nonSiblings: 1 }} // Control node separation
          zoomable={true} // Allows zooming in/out
        />
      )}
    </div>
  );
};
