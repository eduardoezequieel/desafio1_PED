import { useEffect, useState } from 'react';
import { usePatientStore } from '../store';
import { GenericType } from '../../../../types';
import { PatientService } from '../services';

type PatientFields = {
  genders: GenericType[];
  bloodTypes: GenericType[];
  bloodPressures: GenericType[];
};

export const usePatientForm = () => {
  const { isModalOpen } = usePatientStore();
  const [patientFields, setPatientFields] = useState<PatientFields>({
    bloodPressures: [],
    bloodTypes: [],
    genders: [],
  });

  useEffect(() => {
    const fetchPatientFields = async () => {
      const genders = await PatientService.getGenders();
      const bloodTypes = await PatientService.getBloodTypes();
      const bloodPressures = await PatientService.getBloodPressures();

      setPatientFields({
        genders,
        bloodTypes,
        bloodPressures,
      });
    };

    if (isModalOpen) fetchPatientFields();
  }, [isModalOpen]);

  return { patientFields };
};
