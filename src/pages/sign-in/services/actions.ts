import cookies from 'js-cookie';
import { User } from '../../../interfaces';
import { API_URL } from '../../../utils';
import { SignInForm } from '../interfaces';

export const signIn = async (formData: SignInForm): Promise<boolean> => {
  const users: User[] = await fetch(`${API_URL}/users`).then((res) => res.json());
  const user = users.find(
    (user) => user.username === formData.username && user.password === formData.password
  );

  if (!user) return false;

  cookies.set('signedUser', JSON.stringify(user), {
    expires: 7,
    sameSite: 'strict',
  });

  return true;
};
