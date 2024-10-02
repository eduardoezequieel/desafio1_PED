import { create } from 'zustand';
import { AuthStore } from '../interfaces';

export const useAuthStore = create<AuthStore>((set) => ({
  signedUser: null,
  setSignedUser: (user) => set({ signedUser: user }),
}));
