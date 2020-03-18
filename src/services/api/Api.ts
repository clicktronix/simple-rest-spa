import { CONFIG } from 'core/config';

import { HttpActions } from './HttpActions';
import { Users } from './entities/Users';
import { Storage } from './storage';
import { Auth } from './entities/Auth';

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
}

export { Api };
