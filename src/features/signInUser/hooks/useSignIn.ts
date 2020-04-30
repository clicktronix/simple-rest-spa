import { useContext } from 'react';
import { useMountedState } from 'react-use';
import { useHistory } from 'react-router';

import { AuthContext } from 'services/auth';
import { useValidState } from 'shared/hooks/useValidState';
import { useApi } from 'shared/hooks/useApi';
import { routes } from 'modules/routes';

import { SignInForm } from '../types';

export function useSignIn() {
  const api = useApi();
  const history = useHistory();
  const isMounted = useMountedState();
  const auth = useContext(AuthContext);
  const [isLoading, setIsLoading] = useValidState(isMounted, false);
  const [error, setError] = useValidState(isMounted, '');

  const signIn = async (values: SignInForm) => {
    try {
      setIsLoading(true);
      const { data, tokens } = await api.auth.signIn(values);
      auth?.setAuth(data, tokens.accessToken, tokens.refreshToken);
      history.push(routes.mainRoutes.MAIN);
      setError('');
    } catch (e) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    signIn,
    error,
    isLoading,
  };
}
