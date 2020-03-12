import { Storage } from 'services/api/storage';

export function useToken(storage: Storage) {
  const getToken = () => storage.get<string, null>('token', null);

  const setToken = (user: string) => storage.set('token', user);

  const resetToken = () => storage.del('token');

  return {
    getToken,
    setToken,
    resetToken,
  };
}
