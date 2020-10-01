import { useCallback } from 'react';
import { useMountedState } from 'react-use';

import { useApi } from 'shared/hooks/useApi';
import { useValidState } from 'shared/hooks/useValidState';
import { User } from 'shared/types/models';

export function useUsers() {
  const api = useApi();
  const isMounted = useMountedState();
  const [error, setError] = useValidState(isMounted, '');
  const [users, setUsers] = useValidState<User[]>(isMounted, []);
  const [isLoading, setIsLoading] = useValidState(isMounted, false);

  const fetchUsers = useCallback(async () => {
    try {
      setIsLoading(true);
      const u = await api.users.getUsers();
      setUsers(u.map((x, i) => ({
        ...x,
        key: i,
      })));
      setError('');
    } catch (e) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  }, [api.users, setError, setIsLoading, setUsers]);

  const deleteUser = useCallback(async (id: string) => {
    try {
      setIsLoading(true);
      await api.users.deleteUser(id);
      setError('');
    } catch (e) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  }, [api.users, setError, setIsLoading]);

  return {
    users,
    isLoading,
    error,
    fetchUsers,
    deleteUser,
  };
}
