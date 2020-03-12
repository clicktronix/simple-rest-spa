import React from 'react';

import 'antd/dist/antd.css';
import { Api, ApiContext } from 'services/api';
import { LocalStorage, MemoryStorage } from 'services/api/storage';

const App: React.FC = ({ children }) => {
  const storage = LocalStorage.checkAvailability() ? new LocalStorage() : new MemoryStorage();
  const api = new Api(storage);

  return (
    <ApiContext.Provider value={api}>
      {children}
    </ApiContext.Provider>
  );
};

export { App };
