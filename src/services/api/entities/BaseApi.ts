import { HttpActions } from '../HttpActions';
import { Storage } from '../storage';

class BaseApi {
  protected actions: HttpActions;
  protected storage: Storage;

  get token() {
    return this.storage.get<string, null>('token', null);
  }

  set token(t: string | null) {
    this.storage.set('token', t);
  }

  constructor(actions: HttpActions, storage: Storage) {
    this.actions = actions;
    this.storage = storage;
  }

  protected setHeaders() {
    return { headers: { Authorization: this.token } };
  }
}

export { BaseApi };
