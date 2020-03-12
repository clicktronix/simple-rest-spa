import React from 'react';
import { FieldRenderProps } from 'react-final-form';

import { TextInput, Props } from '../../components';
import { getFieldWithComponent } from '../../../helpers/getFieldWithComponent';

type TextInputFieldProps = Props & FieldRenderProps<string | number>;

function TextInputFieldComponent(props: TextInputFieldProps) {
  const { input, meta, ...rest } = props;
  const error = (meta.touched && rest.error) || (meta.touched && meta.error) ? meta.error : undefined;

  return <TextInput {...input} error={error} {...rest} />;
}

const TextInputField = getFieldWithComponent(TextInputFieldComponent);

export { TextInputField };
