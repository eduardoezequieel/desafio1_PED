import { User } from './User';

export interface AuthStore {
  signedUser: User | null;
  setSignedUser: (user: User | null) => void;
}
