import { GenericType } from '../../../../interfaces';
import { API_URL } from '../../../../utils';
import { Patient, PatientForm } from '../interfaces';

export const getGenders = async () => {
  const genders: GenericType[] = await fetch(`${API_URL}/genders`).then((res) => res.json());
  return genders;
};

export const getBloodTypes = async () => {
  const bloodTypes: GenericType[] = await fetch(`${API_URL}/bloodTypes`).then((res) => res.json());
  return bloodTypes;
};

export const getBloodPressures = async () => {
  const bloodPressures: GenericType[] = await fetch(`${API_URL}/bloodPressures`).then((res) =>
    res.json()
  );
  return bloodPressures;
};

export const createPatient = async (formData: PatientForm) => {
  const response = await fetch(`${API_URL}/patients`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...formData,
      age: parseInt(formData.age),
      genderId: parseInt(formData.genderId),
      bloodTypeId: parseInt(formData.bloodTypeId),
      bloodPressureId: parseInt(formData.bloodPressureId),
    }),
  });

  return response.ok;
};

export const updatePatient = async ({
  patientId,
  formData,
}: {
  patientId: string;
  formData: PatientForm;
}) => {
  const response = await fetch(`${API_URL}/patients/${patientId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...formData,
      age: parseInt(formData.age),
      genderId: parseInt(formData.genderId),
      bloodTypeId: parseInt(formData.bloodTypeId),
      bloodPressureId: parseInt(formData.bloodPressureId),
    }),
  });

  return response.ok;
};

export const getPatients = async () => {
  const patients: Patient[] = await fetch(
    `${API_URL}/patients/?_embed=gender&_embed=bloodType&_embed=bloodPressure`
  ).then((res) => res.json());

  return patients;
};

export const deletePatient = async (patientId: string) => {
  const response = await fetch(`${API_URL}/patients/${patientId}`, {
    method: 'DELETE',
  });

  return response.ok;
};
