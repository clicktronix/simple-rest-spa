import { User } from 'shared/types/models';

export type Auth = {
  user: User | null,
  setAuth: (user: User, token: string, refreshToken: string) => void,
  resetAuth: () => void,
};
