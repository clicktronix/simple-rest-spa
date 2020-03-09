export function makeRequired<T>(errorMsg: T) {
  return (value: string | number) => (!value ? errorMsg : undefined);
}
