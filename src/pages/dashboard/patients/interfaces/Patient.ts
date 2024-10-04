import { GenericType } from '../../../../interfaces';

export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  age: string;
  genderId: string;
  bloodTypeId: string;
  bloodPressureId: string;
  gender: GenericType;
  bloodType: GenericType;
  bloodPressure: GenericType;
}
