import { HttpActions } from './HttpActions';
import { Storage } from './storage';

class BaseApi {
  protected actions: HttpActions;
  protected storage: Storage;

  set token(value: string | null) {
    this.token = value;
  }

  constructor(actions: HttpActions, storage: Storage) {
    this.actions = actions;
    this.storage = storage;
  }
}

export { BaseApi };
