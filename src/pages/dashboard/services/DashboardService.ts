import { NodeItem } from '../../../models';
import { EmbeddedGenericType } from '../../../types';
import { API_URL } from '../../../utils';

type Options = {
  entity: 'genders' | 'bloodTypes' | 'bloodPressures';
};

export class DashboardService {
  static async getPatientsByEntity({ entity }: Options): Promise<NodeItem[]> {
    const data: EmbeddedGenericType[] = await fetch(`${API_URL}/${entity}/?_embed=patients`).then(
      (res) => res.json()
    );

    const nodeTree = data.map((item) => {
      const node = new NodeItem(
        item.id,
        item.name,
        item.patients.map(
          ({ id, firstName, lastName }) => new NodeItem(id, `${firstName} ${lastName}`)
        )
      );

      return node;
    });

    return nodeTree;
  }
}
