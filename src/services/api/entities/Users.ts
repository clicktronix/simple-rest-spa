import { autobind } from 'core-decorators';

import { User } from 'shared/types/models';

import { BaseApi } from './BaseApi';
import { UsersResponse, UserResponse } from '../types/models/user';
import { convertServerUser } from '../converters/users';

class Users extends BaseApi {
  @autobind
  public async getUsers() {
    const response = await this.actions.get<UsersResponse>({
      url: '/users', options: this.setHeaders(),
    });
    return response.data.data.map(convertServerUser);
  }

  @autobind
  public async getUser(userId: string) {
    const response = await this.actions.get<UserResponse>({
      url: `/users/${userId}`, options: this.setHeaders(),
    });
    return convertServerUser(response.data.data);
  }

  @autobind
  public async updateUser(userId: string, body: User & { password?: string, newPassword?: string }) {
    const response = await this.actions.put<UserResponse>({
      url: `/users/${userId}`, data: body, options: this.setHeaders(),
    });
    return convertServerUser(response.data.data);
  }

  @autobind
  public async deleteUser(userId: string) {
    const response = await this.actions.del<UserResponse>({
      url: `/users/${userId}`,
      options: this.setHeaders(),
    });
    return convertServerUser(response.data.data);
  }
}

export { Users };
