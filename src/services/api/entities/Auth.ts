import { autobind } from 'core-decorators';

import { RegisterUser } from 'shared/types/models';

import { BaseApi } from './BaseApi';
import { AuthResponse } from '../types/models/auth';
import { convertServerAuth } from '../converters/auth';

class Auth extends BaseApi {
  @autobind
  public async signUp(data: RegisterUser) {
    const response = await this.actions.post<AuthResponse>({
      url: '/register', data,
    });
    return response;
  }

  @autobind
  public async signIn(data: { email: string; password: string }) {
    const response = await this.actions.post<AuthResponse>({
      url: '/authenticate', data,
    });
    return convertServerAuth(response.data);
  }
}

export { Auth };
