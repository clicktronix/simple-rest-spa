import { AuthUser } from 'shared/types/models';

import { AuthResponse } from '../types/models/auth';

export function convertServerAuth({ user, token }: AuthResponse): AuthUser {
  return {
    data: {
      id: user._id,
      name: user.name,
      surname: user.surname,
      email: user.email,
    },
    tokens: {
      accessToken: token.accessToken,
      refreshToken: token.refreshToken,
    },
  };
}
