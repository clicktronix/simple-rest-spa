import { useMountedState } from 'react-use';

import { useApi } from 'shared/hooks/useApi';
import { useValidState } from 'shared/hooks/useValidState';

import { SignUpForm } from '../types';

export function useSignUp() {
  const api = useApi();
  const isMounted = useMountedState();
  const [isLoading, setIsLoading] = useValidState(isMounted, false);
  const [error, setError] = useValidState(isMounted, '');
  const [success, setSuccess] = useValidState(isMounted, '');

  const signUp = async (values: SignUpForm) => {
    try {
      setIsLoading(true);
      await api.auth.signUp(values);
      setSuccess('User successfully registered.');
      setError('');
    } catch (e) {
      setSuccess('');
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    success,
    error,
    signUp,
  };
}
