import { useMountedState } from 'react-use';

import { useApi } from 'shared/hooks/useApi';
import { useValidState } from 'shared/hooks/useValidState';

import { ProfileForm } from '../types';

export function useUpdateProfile(userId: string) {
  const api = useApi();
  const isMounted = useMountedState();
  const [updateError, setUpdateError] = useValidState(isMounted, '');
  const [isUpdating, setIsUpdating] = useValidState(isMounted, false);

  const updateProfile = async (values: ProfileForm) => {
    try {
      setIsUpdating(true);
      userId && await api.users.updateUser(userId, {
        ...values, id: userId,
      });
      setUpdateError('');
    } catch (e) {
      setUpdateError(e.message);
    } finally {
      setIsUpdating(false);
    }
  };

  return {
    updateProfile,
    isUpdating,
    updateError,
  };
}
