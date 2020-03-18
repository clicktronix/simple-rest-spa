import { useState } from 'react';

export const useFetch = <R, C extends (...args: any[]) => Promise<R>>(callback: C) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetch = async <V>(values: V) => {
    try {
      setIsLoading(true);
      const res = await callback(values);
      return res;
    } catch (e) {
      setError(e.message);
      return e;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    fetch,
    isLoading,
    error,
  };
};
