import { User } from '../models/User';

export type AuthStore = {
  signedUser: User | null;
  setSignedUser: (user: User | null) => void;
};
