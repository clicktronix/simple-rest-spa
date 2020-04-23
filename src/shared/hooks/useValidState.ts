import { useState } from 'react';

export function useValidState<T>(isMounted: () => boolean, initial: T) {
  const [state, setState] = useState<T>(initial);
  const checkedState = (args: T) => isMounted() && setState(args);

  return [
    state,
    checkedState,
  ];
}
