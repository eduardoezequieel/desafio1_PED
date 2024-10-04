import { useEffect, useState } from 'react';
import { GenericType } from '../../../../interfaces';
import { usePatientStore } from '../store';
import { getBloodPressures, getBloodTypes, getGenders } from '../services';

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
      const genders = await getGenders();
      const bloodTypes = await getBloodTypes();
      const bloodPressures = await getBloodPressures();

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
