import { AuthUser } from 'shared/types/models';

import { AuthResponse } from '../types/models/auth';

export function convertServerAuth(data: AuthResponse): AuthUser {
  return {
    data: {
      id: data.data._id,
      name: data.data.name,
      surname: data.data.surname,
      email: data.data.email,
    },
    tokens: {
      accessToken: data.token.accessToken,
      refreshToken: data.token.refreshToken,
    },
  };
}
