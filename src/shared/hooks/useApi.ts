import { useContext } from 'react';

import { ApiContext } from 'services/api';

export function useApi() {
  const api = useContext(ApiContext);
  if (!api) {
    throw new Error('Api React Context is not defined');
  }
  return api;
}
