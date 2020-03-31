import React, { useState } from 'react';
import { useAsync, useMountedState } from 'react-use';

import { useToken } from 'utils/hooks/useToken';
import { useApi } from 'utils/hooks/useApi';
import { User } from 'shared/types/models';

import { Auth } from './types';

export const AuthContext = React.createContext<Auth | null>(null);

export const AuthContextProvider: React.FC = ({ children }) => {
  const isMounted = useMountedState();
  const [, setIsLoading] = useState();
  const [, setError] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const api = useApi();
  const { getToken, setToken, resetToken } = useToken(api.storage);

  const refreshTokenInterceptor = async () => {
    try {
      setIsLoading(true);
      const { token } = await api.auth.updateTokens();
      isMounted() && setToken(token.accessToken, token.refreshToken);
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
        user, setAuth, resetAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
