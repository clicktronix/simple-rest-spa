import { CONFIG } from 'core/config';

import { HttpActions } from './HttpActions';
import { Users } from './Users';
import { Storage, storage } from './storage';

class Api {
  private actions: HttpActions;
  private headers = {};

  public users: Users;

  constructor(localStorage: Storage) {
    this.actions = new HttpActions(CONFIG.baseUrl, this.headers);

    this.users = new Users(this.actions, localStorage);
  }
}

const api = new Api(storage);
export { api };
