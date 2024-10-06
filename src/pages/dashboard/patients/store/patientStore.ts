import { create } from 'zustand';
import { PatientStore } from '../types';

export const usePatientStore = create<PatientStore>((set) => ({
  isModalOpen: false,
  openModal: ({ modalTitle, selectedPatient }) => {
    set({
      isModalOpen: true,
      modalTitle,
      selectedPatient: selectedPatient || null,
      modalMode: selectedPatient ? 'edit' : 'create',
    });
  },
  closeModal: () => set({ isModalOpen: false, selectedPatient: null }),
  modalTitle: '',
  modalMode: 'create',
  selectedPatient: null,
}));
