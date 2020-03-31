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

  get refreshToken() {
    return this.storage.get<string, null>('refreshToken', null);
  }

  set refreshToken(t: string | null) {
    this.storage.set('refreshToken', t);
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
