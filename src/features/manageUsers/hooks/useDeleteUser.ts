import { useCallback } from 'react';
import { useMountedState } from 'react-use';

import { useApi } from 'shared/hooks/useApi';
import { useValidState } from 'shared/hooks/useValidState';

export function useDeleteUser() {
  const api = useApi();
  const isMounted = useMountedState();
  const [deleteUserError, setDeleteUserError] = useValidState(isMounted, '');
  const [isDeleting, setIsDeleting] = useValidState(isMounted, false);

  const deleteUser = useCallback(async (id: string) => {
    try {
      setIsDeleting(true);
      await api.users.deleteUser(id);
      setDeleteUserError('');
    } catch (e) {
      setDeleteUserError(e.message);
    } finally {
      setIsDeleting(false);
    }
  }, [api.users, setDeleteUserError, setIsDeleting]);

  return {
    deleteUser,
    isDeleting,
    deleteUserError,
  };
}
