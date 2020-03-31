import { AuthUser } from 'shared/types/models';

import { AuthResponse } from '../types/models/auth';

export function convertServerAuth(data: AuthResponse): AuthUser {
  return {
    data: {
      id: data.user._id,
      name: data.user.name,
      surname: data.user.surname,
      email: data.user.email,
    },
    tokens: {
      accessToken: data.token.accessToken,
      refreshToken: data.token.refreshToken,
    },
  };
}
