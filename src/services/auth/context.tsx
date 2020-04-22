import React, { useState } from 'react';
import { useAsync, useMountedState } from 'react-use';

import { useToken } from 'shared/hooks/useToken';
import { useApi } from 'shared/hooks/useApi';
import { User } from 'shared/types/models';

import { Auth } from './types';

export const AuthContext = React.createContext<Auth | null>(null);

export const AuthContextProvider: React.FC = ({ children }) => {
  const api = useApi();
  const { getToken, setToken, resetToken } = useToken(api.storage);
  const isMounted = useMountedState();
  const isLoadingRequired = Boolean(getToken());
  const [isLoading, setIsLoading] = useState(isLoadingRequired);
  const [, setError] = useState('');
  const [user, setUser] = useState<User | null>(null);

  const refreshTokenInterceptor = async () => {
    try {
      setIsLoading(true);
      const tokens = await api.auth.updateTokens();
      isMounted() && setToken(tokens.accessToken, tokens.refreshToken);
      const u = await api.auth.signInByToken();
      isMounted() && setUser(u.data);
    } catch (e) {
      isMounted() && setError(e.message);
    } finally {
      isMounted() && setIsLoading(false);
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
        isMounted() && setUser(u.data);
        isMounted() && setToken(u.tokens.accessToken, u.tokens.refreshToken);
      } catch (e) {
        isMounted() && setError(e.message);
      } finally {
        isMounted() && setIsLoading(false);
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
