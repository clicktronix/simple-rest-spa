import React, { useState } from 'react';

import { useToken } from 'utils/hooks/useToken';
import { useApi } from 'utils/hooks/useApi';
import { User } from 'shared/types/models';

import { Auth } from './types';

export const AuthContext = React.createContext<Auth | null>(null);

export const AuthContextProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const api = useApi();
  const { getToken, setToken, resetToken } = useToken(api.storage);

  const setAuth = (u: User, token: string) => {
    setUser(u);
    setToken(token);
  };

  const resetAuth = () => {
    setUser(null);
    resetToken();
  };

  return (
    <AuthContext.Provider
      value={{
        user, token: getToken(), setAuth, resetAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
