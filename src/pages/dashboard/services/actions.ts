import { EmbeddedGenericType, NodeItem } from '../../../interfaces';
import { API_URL } from '../../../utils';

type Options = {
  entity: 'genders' | 'bloodTypes' | 'bloodPressures';
};

export const getPatientsByEntity = async ({ entity }: Options) => {
  const data: EmbeddedGenericType[] = await fetch(`${API_URL}/${entity}/?_embed=patients`).then(
    (res) => res.json()
  );

  const nodeTree = data.map((item) => {
    const node: NodeItem = {
      id: item.id,
      name: item.name,
      children: item.patients.map(({ id, firstName, lastName }) => ({
        id,
        name: `${firstName} ${lastName}`,
      })),
    };

    return node;
  });

  return nodeTree;
};
