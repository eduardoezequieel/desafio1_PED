import { Patient } from './Patient';

export interface PatientStore {
  isModalOpen: boolean;
  openModal: ({
    modalTitle,
    selectedPatient,
  }: {
    modalTitle: string;
    selectedPatient?: Patient;
  }) => void;
  closeModal: () => void;
  modalTitle: string;
  modalMode: 'create' | 'edit';
  selectedPatient: Patient | null;
}
