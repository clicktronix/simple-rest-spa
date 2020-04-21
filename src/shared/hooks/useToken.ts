import { Storage } from 'services/api/storage';

export function useToken(storage: Storage) {
  const getToken = () => storage.get<string, null>('token', null);

  const setToken = (token: string, refreshToken: string) => {
    storage.set('token', token);
    storage.set('refreshToken', refreshToken);
  };

  const resetToken = () => {
    storage.del('token');
    storage.del('refreshToken');
  };

  return {
    getToken,
    setToken,
    resetToken,
  };
}
