import { Patient } from '../pages/dashboard/patients/models';
import { GenericType } from '../types/GenericType';

export interface EmbeddedGenericType extends GenericType {
  patients: Patient[];
}
