import { CONFIG } from 'core/config';

import { HttpActions } from './HttpActions';
import { Users } from './entities/Users';
import { Storage } from './storage';
import { Auth } from './entities/Auth';
import { Interceptors } from './types';

class Api {
  private actions: HttpActions;
  private headers = {};

  public users: Users;
  public auth: Auth;

  constructor(public storage: Storage) {
    this.actions = new HttpActions(CONFIG.baseUrl, this.headers);

    this.users = new Users(this.actions, storage);
    this.auth = new Auth(this.actions, storage);
  }

  public initAuthInterceptors(interceptors: Interceptors) {
    this.actions.initInterceptors(interceptors);
  }
}

export { Api };
