import { LocalStorage } from './LocalStorage';
import { Storage } from './types';

const storage: Storage = new LocalStorage();

export * from './types';
export { storage };
