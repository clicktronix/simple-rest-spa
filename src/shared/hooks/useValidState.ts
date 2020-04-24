import { useState, useCallback } from 'react';

export function useValidState<T>(isMounted: () => boolean, initial: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [state, setState] = useState<T>(initial);
  const checkedState: React.Dispatch<React.SetStateAction<T>> = useCallback((arg: T) => {
    if (isMounted()) {
      setState(arg);
    }
  }, [isMounted]);

  return [
    state,
    checkedState,
  ];
}
