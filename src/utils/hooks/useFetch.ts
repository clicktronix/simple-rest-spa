import { useState } from 'react';

type InferResult<E> = E extends (...args: any[]) => Promise<infer R> ? R : never;

export const useFetch = <C extends (...args: any[]) => Promise<any>>(callback: C) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetch = async <V>(values: V) => {
    try {
      setIsLoading(true);
      const res: InferResult<C> = await callback(values);
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
