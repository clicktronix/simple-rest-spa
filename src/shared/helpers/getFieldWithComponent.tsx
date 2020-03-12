import React from 'react';
import { Field, FieldRenderProps, FieldProps as RFFieldProps } from 'react-final-form';

type Value = string | number;
type BaseWrappedFieldProps = FieldRenderProps<Value, any> & {
  value?: any;
};

function getFieldWithComponent<P extends BaseWrappedFieldProps>(Component: React.ComponentType<P>, type?: string) {
  type OwnProps = Omit<P, keyof BaseWrappedFieldProps>;
  type FieldProps = RFFieldProps<Value, P>;
  type ResultProps = OwnProps & FieldProps;

  const result = (props: ResultProps) => (
    <Field type={type} {...props} component={Component} />
  );

  result.displayName = `FieldWithComponent(${Component.displayName || Component.name || 'Component'})`;

  return result;
}

export { getFieldWithComponent };
