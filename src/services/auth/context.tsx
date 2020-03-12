import React from 'react';

import { useToken } from 'utils/hooks/useToken';
import { useApi } from 'utils/hooks/useApi';

export const AuthContext = React.createContext<string | null>(null);

export const AuthContextProvider: React.FC = ({ children }) => {
  const api = useApi();
  const { getToken } = useToken(api.storage);

  return (
    <AuthContext.Provider value={getToken()}>
      {children}
    </AuthContext.Provider>
  );
};
