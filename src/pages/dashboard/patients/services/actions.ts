import { GenericType } from '../../../../types';
import { API_URL } from '../../../../utils';
import { Patient } from '../models';
import { PatientForm } from '../types';

export class PatientService {
  static async getGenders() {
    const genders: GenericType[] = await fetch(`${API_URL}/genders`).then((res) => res.json());
    return genders;
  }

  static async getBloodTypes() {
    const bloodTypes: GenericType[] = await fetch(`${API_URL}/bloodTypes`).then((res) =>
      res.json()
    );
    return bloodTypes;
  }

  static async getBloodPressures() {
    const bloodPressures: GenericType[] = await fetch(`${API_URL}/bloodPressures`).then((res) =>
      res.json()
    );
    return bloodPressures;
  }

  static async createPatient(formData: PatientForm) {
    const response = await fetch(`${API_URL}/patients`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
      }),
    });

    return response.ok;
  }

  static async updatePatient({
    patientId,
    formData,
  }: {
    patientId: string;
    formData: PatientForm;
  }) {
    const response = await fetch(`${API_URL}/patients/${patientId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
      }),
    });

    return response.ok;
  }

  static async getPatients() {
    const patients: Patient[] = await fetch(
      `${API_URL}/patients/?_embed=gender&_embed=bloodType&_embed=bloodPressure`
    ).then((res) => res.json());

    return patients;
  }

  static async deletePatient(patientId: string) {
    const response = await fetch(`${API_URL}/patients/${patientId}`, {
      method: 'DELETE',
    });

    return response.ok;
  }
}
