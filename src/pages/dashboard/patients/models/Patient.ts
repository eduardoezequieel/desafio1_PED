import { GenericType } from '../../../../types';

export class Patient {
  id: string;
  firstName: string;
  lastName: string;
  age: string;
  genderId: string;
  bloodTypeId: string;
  bloodPressureId: string;
  gender: GenericType | null;
  bloodType: GenericType | null;
  bloodPressure: GenericType | null;

  constructor(
    id: string,
    firstName: string,
    lastName: string,
    age: string,
    genderId: string,
    bloodTypeId: string,
    bloodPressureId: string,
    gender: GenericType | null,
    bloodType: GenericType | null,
    bloodPressure: GenericType | null
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.genderId = genderId;
    this.bloodTypeId = bloodTypeId;
    this.bloodPressureId = bloodPressureId;
    this.gender = gender;
    this.bloodType = bloodType;
    this.bloodPressure = bloodPressure;
  }
}
