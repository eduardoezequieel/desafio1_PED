import { useEffect, useState } from 'react';
import { Patient } from '../interfaces';
import { usePatientStore } from '../store';
import { getPatients } from '../services';

export const usePatientsManagement = () => {
  const { isModalOpen } = usePatientStore();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    const fetchPatients = async () => {
      const patients = await getPatients();
      setPatients(patients);
    };

    if (!isModalOpen) fetchPatients();
  }, [isModalOpen, trigger]);

  const refreshPatients = () => {
    setTrigger((prev) => !prev);
  };

  return { patients, refreshPatients };
};
