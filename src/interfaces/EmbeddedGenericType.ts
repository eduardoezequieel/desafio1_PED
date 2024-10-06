import { Patient } from '../pages/dashboard/patients/interfaces';
import { GenericType } from './GenericType';

export interface EmbeddedGenericType extends GenericType {
  patients: Patient[];
}
