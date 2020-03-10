import { autobind } from 'core-decorators';

import { BaseApi } from './BaseApi';
import { UserResponse, User } from './types/models/user';

class Users extends BaseApi {
  @autobind
  public async signUp(params: User) {
    const response = await this.actions.post<UserResponse[]>('/register', params);
    return response;
  }

  @autobind
  public async signIn(params: User) {
    const response = await this.actions.post<UserResponse[]>('/authenticate', params);
    return response;
  }

  @autobind
  public async loadUsers() {
    const response = await this.actions.get<UserResponse[]>('/users');
    return response;
  }
}

export { Users };
