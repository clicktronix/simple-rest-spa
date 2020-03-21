import React from 'react';
import { Input, Typography } from 'antd';

const { Text } = Typography;

export type Props = Input['props'] & {
  password?: boolean;
  error?: string;
};

export const TextInput = ({ error, password, ...rest }: Props) => (
  <>
    {password
      ? <Input.Password {...rest} />
      : <Input {...rest} />}
    {error && <Text type="danger">{error}</Text>}
  </>
);
