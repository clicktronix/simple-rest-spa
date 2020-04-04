import { User } from 'shared/types/models';

export type Auth = {
  user: User | null,
  isLoading: boolean;
  setAuth: (user: User, token: string, refreshToken: string) => void,
  resetAuth: () => void,
};
