import { autobind } from 'core-decorators';

import { RegisterUser } from 'shared/types/models';

import { BaseApi } from './BaseApi';
import { AuthResponse, TokenResponse } from '../types/models/auth';
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

  @autobind
  public async signInByToken() {
    const response = await this.actions.get<AuthResponse>({
      url: '/token-authenticate', options: this.setHeaders(),
    });
    return convertServerAuth(response.data);
  }

  @autobind
  public async updateTokens() {
    const response = await this.actions.get<{ token: TokenResponse }>({
      url: '/authenticate/refresh',
      options: this.setHeaders(),
      data: { refreshToken: this.refreshToken },
    });
    return response.data.token;
  }
}

export { Auth };
