import React from 'react';
import { useAsync, useMountedState } from 'react-use';

import { useToken } from 'shared/hooks/useToken';
import { useApi } from 'shared/hooks/useApi';
import { User } from 'shared/types/models';
import { useValidState } from 'shared/hooks/useValidState';

import { Auth } from './types';

export const AuthContext = React.createContext<Auth | null>(null);

export const AuthContextProvider: React.FC = ({ children }) => {
  const api = useApi();
  const { getToken, setToken, resetToken } = useToken(api.storage);
  const isMounted = useMountedState();
  const isLoadingRequired = Boolean(getToken());
  const [isLoading, setIsLoading] = useValidState(isMounted, isLoadingRequired);
  const [, setError] = useValidState(isMounted, '');
  const [user, setUser] = useValidState<User | null>(isMounted, null);

  const refreshTokenInterceptor = async () => {
    try {
      setIsLoading(true);
      const tokens = await api.auth.updateTokens();
      setToken(tokens.accessToken, tokens.refreshToken);
      const u = await api.auth.signInByToken();
      setUser(u.data);
    } catch (e) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  const setAuth = (u: User, token: string, refreshToken: string) => {
    setUser(u);
    setToken(token, refreshToken);
  };

  const resetAuth = () => {
    setUser(null);
    resetToken();
  };

  useAsync(async () => {
    api.initAuthInterceptors({ refreshTokenInterceptor });
    if (!user && getToken()) {
      try {
        setIsLoading(true);
        const u = await api.auth.signInByToken();
        setUser(u.data);
        setToken(u.tokens.accessToken, u.tokens.refreshToken);
      } catch (e) {
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    }
  });

  return (
    <AuthContext.Provider
      value={{
        user, setAuth, resetAuth, isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
