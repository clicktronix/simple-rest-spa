import { UserResponse } from './user';

export type AuthResponse = {
  data: UserResponse['data'];
  token: TokenResponse;
};

export type TokenResponse = {
  accessToken: string;
  refreshToken: string;
};
