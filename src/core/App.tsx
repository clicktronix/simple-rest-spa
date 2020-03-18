import React from 'react';
import ErrorBoundary from 'antd/lib/alert/ErrorBoundary';
import 'antd/dist/antd.css';

import { ApiContextProvider } from 'services/api';
import { AuthContextProvider } from 'services/auth';

const App: React.FC = ({ children }) => (
  <ErrorBoundary>
    <ApiContextProvider>
      <AuthContextProvider>
        {children}
      </AuthContextProvider>
    </ApiContextProvider>
  </ErrorBoundary>
);

export { App };
