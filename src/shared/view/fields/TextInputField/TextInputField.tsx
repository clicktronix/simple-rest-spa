import React from 'react';
import { FieldRenderProps } from 'react-final-form';
import { InputProps } from 'antd/lib/input';

import { TextInput } from '../../components';
import { getFieldWithComponent } from '../../../helpers/getFieldWithComponent';

type TextInputFieldProps = InputProps & FieldRenderProps<string | number>;

function TextInputFieldComponent(props: TextInputFieldProps) {
  const { input, meta, ...rest } = props;
  // const error = (meta.touched && rest.error) || (meta.touched && meta.error) ? meta.error : undefined;

  return <TextInput {...rest} {...input} />;
}

const TextInputField = getFieldWithComponent(TextInputFieldComponent);

export { TextInputField };
