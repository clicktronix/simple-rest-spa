import React from 'react';
import { FieldRenderProps } from 'react-final-form';

import { TextInput, Props as TextInputProps } from '../../components';
import { getFieldWithComponent } from '../../../helpers/getFieldWithComponent';

type ITextInputFieldProps = TextInputProps & FieldRenderProps<string | number>;

function TextInputFieldComponent(props: ITextInputFieldProps) {
  const { input, meta, ...rest } = props;
  const error = (meta.touched && rest.error) || (meta.touched && meta.error) ? meta.error : undefined;

  return <TextInput {...rest} error={error} {...input} />;
}

const TextInputField = getFieldWithComponent(TextInputFieldComponent);

export { TextInputField };
