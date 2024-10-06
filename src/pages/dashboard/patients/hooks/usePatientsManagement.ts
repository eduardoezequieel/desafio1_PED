import { useEffect, useState } from 'react';
import { usePatientStore } from '../store';
import { Patient } from '../models';
import { PatientService } from '../services';

export const usePatientsManagement = () => {
  const { isModalOpen } = usePatientStore();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    const fetchPatients = async () => {
      const patients = await PatientService.getPatients();
      setPatients(patients);
    };

    if (!isModalOpen) fetchPatients();
  }, [isModalOpen, trigger]);

  const refreshPatients = () => {
    setTrigger((prev) => !prev);
  };

  return { patients, refreshPatients };
};
