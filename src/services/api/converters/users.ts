import { User } from 'shared/types/models';

import { UserResponse } from '../types/models/user';

export function convertServerUser(data: UserResponse): User {
  return {
    id: data._id,
    name: data.name,
    surname: data.surname,
    email: data.email,
  };
}
