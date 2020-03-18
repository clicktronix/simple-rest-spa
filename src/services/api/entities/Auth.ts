import { autobind } from 'core-decorators';

import { User } from 'shared/types/models';

import { BaseApi } from './BaseApi';
import { UserResponse, SignInResponse } from '../types/models/user';

class Auth extends BaseApi {
  @autobind
  public async signUp(params: User) {
    const response = await this.actions.post<UserResponse>('/register', params);
    return response;
  }

  @autobind
  public async signIn(params: { email: string; password: string }) {
    const response = await this.actions.post<SignInResponse>('/authenticate', params);
    return response;
  }
}

export { Auth };
