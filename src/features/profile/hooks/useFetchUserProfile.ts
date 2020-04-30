import { useCallback, useEffect } from 'react';
import { useMountedState } from 'react-use';

import { useApi } from 'shared/hooks/useApi';
import { useValidState } from 'shared/hooks/useValidState';
import { UpdateUser } from 'shared/types/models';

export function useFetchUserProfile(userId: string, initialUser: UpdateUser) {
  const api = useApi();
  const isMounted = useMountedState();
  const [fetchUserError, setFetchUserError] = useValidState(isMounted, '');
  const [user, setUser] = useValidState<UpdateUser>(isMounted, initialUser);
  const [isLoading, setIsLoading] = useValidState(isMounted, false);

  const fetchUserProfile = useCallback(async () => {
    if (userId) {
      try {
        setIsLoading(true);
        const usr = await api.users.getUser(userId);
        setUser(state => ({
          ...state, ...usr,
        }));
        setFetchUserError('');
      } catch (e) {
        setFetchUserError(e.message);
      } finally {
        setIsLoading(false);
      }
    }
  }, [api.users, setFetchUserError, setIsLoading, setUser, userId]);

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  return {
    user,
    isLoading,
    fetchUserError,
  };
}
