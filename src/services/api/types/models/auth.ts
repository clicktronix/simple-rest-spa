import { UserResponse } from './user';

export type AuthResponse = {
  user: UserResponse['user'];
  token: TokenResponse;
};

export type TokenResponse = {
  accessToken: string;
  refreshToken: string;
};
