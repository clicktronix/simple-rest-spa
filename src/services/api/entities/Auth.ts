import { autobind } from 'core-decorators';

import { RegisterUser } from 'shared/types/models';

import { BaseApi } from './BaseApi';
import { AuthResponse, TokenResponse } from '../types/models/auth';
import { convertServerAuth } from '../converters/auth';

class Auth extends BaseApi {
  @autobind
  public async signUp(data: RegisterUser) {
    await this.actions.post<AuthResponse>({
      url: '/register', data,
    });
  }

  @autobind
  public async signIn(data: { email: string; password: string }) {
    const response = await this.actions.post<AuthResponse>({
      url: '/authenticate', data,
    });
    return Auth.handleResponse(response, convertServerAuth);
  }

  @autobind
  public async signInByToken() {
    const response = await this.actions.get<AuthResponse>({
      url: '/token-authenticate', options: this.setHeaders(),
    });
    return Auth.handleResponse(response, convertServerAuth);
  }

  @autobind
  public async updateTokens() {
    const response = await this.actions.post<{ token: TokenResponse }>({
      url: '/authenticate/refresh',
      options: this.setHeaders(),
      data: { refreshToken: this.refreshToken },
    });
    return Auth.handleResponse(response, (data: { token: TokenResponse }) => data.token);
  }

  @autobind
  public async logout() {
    const response = await this.actions.get<{ success: boolean }>({
      url: '/logout',
      options: this.setHeaders(),
    });
    return Auth.handleResponse(response, (data: { success: boolean }) => data.success);
  }
}

export { Auth };
