import { UserResponse } from './user';

export type AuthResponse = {
  data: UserResponse;
  token: {
    accessToken: string;
    refreshToken: string;
  };
};
