import { create } from 'zustand';
import { AuthStore } from '../types';

export const useAuthStore = create<AuthStore>((set) => ({
  signedUser: null,
  setSignedUser: (user) => set({ signedUser: user }),
}));
