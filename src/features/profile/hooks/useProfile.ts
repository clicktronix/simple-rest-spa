import { useCallback } from 'react';
import { useMountedState } from 'react-use';

import { useApi } from 'shared/hooks/useApi';
import { useValidState } from 'shared/hooks/useValidState';
import { UpdateUser } from 'shared/types/models';

import { ProfileForm } from '../types';

export function useProfile(initialUser: UpdateUser, userId?: string) {
  const api = useApi();
  const isMounted = useMountedState();
  const [error, setError] = useValidState(isMounted, '');
  const [user, setUser] = useValidState<UpdateUser>(isMounted, initialUser);
  const [isLoading, setIsLoading] = useValidState(isMounted, false);

  const fetchUserProfile = useCallback(async () => {
    if (!userId) {
      return;
    }
    try {
      setIsLoading(true);
      const usr = await api.users.getUser(userId);
      setUser(state => ({
        ...state, ...usr,
      }));
      setError('');
    } catch (e) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  }, [api.users, setError, setIsLoading, setUser, userId]);

  const updateProfile = useCallback(async (values: ProfileForm) => {
    if (!userId) {
      return;
    }
    try {
      setIsLoading(true);
      await api.users.updateUser(userId, {
        ...values, id: userId,
      });
      setError('');
    } catch (e) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  }, [api.users, setError, setIsLoading, userId]);

  return {
    user,
    isLoading,
    error,
    fetchUserProfile,
    updateProfile,
  };
}
