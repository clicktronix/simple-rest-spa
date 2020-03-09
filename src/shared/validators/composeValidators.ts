type Validator = (value: string | number) => string | number | undefined;

export function composeValidators(...validators: Validator[]) {
  return (value: string | number) => validators.reduce((error, validator) => error || validator(value));
}
