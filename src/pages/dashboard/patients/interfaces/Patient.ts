import { GenericType } from '../../../../interfaces';

export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  genderId: number;
  bloodTypeId: number;
  bloodPressureId: number;
  gender: GenericType;
  bloodType: GenericType;
  bloodPressure: GenericType;
}
