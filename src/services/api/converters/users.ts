import { User } from 'shared/types/models';

import { UserResponse, UsersResponse } from '../types/models/user';

export function convertServerUser({ user }: UserResponse): User {
  return {
    id: user._id,
    name: user.name,
    surname: user.surname,
    email: user.email,
  };
}

export function convertServerUsers({ users }: UsersResponse): User[] {
  return users.map(x => convertServerUser({ user: x }));
}
