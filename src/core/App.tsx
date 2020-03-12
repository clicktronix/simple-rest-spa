import React from 'react';

import 'antd/dist/antd.css';
import { ApiContextProvider } from 'services/api';
import { AuthContextProvider } from 'services/auth';

const App: React.FC = ({ children }) => (
  <ApiContextProvider>
    <AuthContextProvider>
      {children}
    </AuthContextProvider>
  </ApiContextProvider>
);

export { App };
