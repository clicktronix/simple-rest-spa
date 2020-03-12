import { CONFIG } from 'core/config';

import { HttpActions } from './HttpActions';
import { Users } from './entities/Users';
import { Storage } from './storage';

class Api {
  private actions: HttpActions;
  private headers = {};

  public users: Users;

  constructor(public storage: Storage) {
    this.actions = new HttpActions(CONFIG.baseUrl, this.headers);

    this.users = new Users(this.actions, storage);
  }
}

export { Api };
