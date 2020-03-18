import { autobind } from 'core-decorators';

import { BaseApi } from './BaseApi';
import { UserResponse } from '../types/models/user';

class Users extends BaseApi {
  @autobind
  public async loadUsers() {
    const response = await this.actions.get<UserResponse[]>('/users', undefined, this.setHeaders());
    return response;
  }
}

export { Users };
