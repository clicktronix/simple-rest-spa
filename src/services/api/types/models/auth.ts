import { UserResponse } from './user';

export type AuthResponse = {
  data: UserResponse['data'];
  token: {
    accessToken: string;
    refreshToken: string;
  };
};
