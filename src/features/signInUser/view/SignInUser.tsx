import React, { useState } from 'react';
import { Form, FormRenderProps } from 'react-final-form';
import { Form as AntForm, Typography } from 'antd';

import { TextInputField } from 'shared/view/fields';
import { Button } from 'shared/view/components';
import { composeValidators, makeRequired } from 'shared/validators';
import { useToken } from 'utils/hooks/useToken';
import { useApi } from 'utils/hooks/useApi';

import styles from './SignInUser.module.scss';

const { Text } = Typography;

type SignInForm = {
  email: string;
  password: string;
};

export const SignIn = () => {
  const api = useApi();
  const { setToken } = useToken(api.storage);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const signIn = async (values: SignInForm) => {
    try {
      setIsLoading(true);
      const res = await api.users.signIn(values);
      setToken(res.data.token.accessToken);
    } catch (e) {
      setError(e.response.data);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (values: SignInForm) => signIn(values);

  const renderForm = ({ handleSubmit }: FormRenderProps<SignInForm>) => (
    <div className={styles.SignInForm}>
      <AntForm onFinish={handleSubmit} className={styles.SignInForm}>
        <AntForm.Item>
          <TextInputField
            name="email"
            placeholder="Enter your email"
            validate={composeValidators(
              makeRequired('Field required'),
            )}
          />
        </AntForm.Item>
        <AntForm.Item>
          <TextInputField
            name="password"
            placeholder="Enter your password"
            validate={composeValidators(
              makeRequired('Field required'),
            )}
          />
        </AntForm.Item>
        <AntForm.Item>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Sign In
          </Button>
        </AntForm.Item>
        {error && <Text type="danger">{error}</Text>}
      </AntForm>
    </div>
  );

  return (
    <Form<SignInForm>
      onSubmit={handleFormSubmit}
      render={renderForm}
      subscription={{}}
    />
  );
};
