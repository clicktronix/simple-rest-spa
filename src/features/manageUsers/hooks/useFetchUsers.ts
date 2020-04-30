import { useCallback, useEffect } from 'react';
import { useMountedState } from 'react-use';

import { useApi } from 'shared/hooks/useApi';
import { useValidState } from 'shared/hooks/useValidState';
import { User } from 'shared/types/models';

export function useFetchUsers() {
  const api = useApi();
  const isMounted = useMountedState();
  const [fetchUsersError, setFetchUsersError] = useValidState(isMounted, '');
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
      setFetchUsersError('');
    } catch (e) {
      setFetchUsersError(e.message);
    } finally {
      setIsLoading(false);
    }
  }, [api.users, setFetchUsersError, setIsLoading, setUsers]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return {
    users,
    isLoading,
    fetchUsersError,
    fetchUsers,
  };
}
