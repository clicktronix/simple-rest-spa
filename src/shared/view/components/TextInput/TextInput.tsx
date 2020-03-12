import React from 'react';
import { Input, Typography } from 'antd';

const { Text } = Typography;

export type Props = Input['props'] & {
  error?: string;
};

export const TextInput = ({ error, ...rest }: Props) => (
  <>
    <Input {...rest} />
    {error && <Text type="danger">{error}</Text>}
  </>
);
