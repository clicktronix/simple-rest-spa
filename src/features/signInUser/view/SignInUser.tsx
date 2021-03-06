import React from 'react';
import { Form, FormRenderProps } from 'react-final-form';
import { Form as AntForm, Typography } from 'antd';

import { TextInputField } from 'shared/view/fields';
import { Button } from 'shared/view/components';
import { composeValidators, makeRequired } from 'shared/validators';

import styles from './SignInUser.module.scss';
import { useSignIn } from '../hooks/useSignIn';
import { SignInForm } from '../types';

const { Text } = Typography;

export const SignIn = () => {
  const { signIn, error, isLoading } = useSignIn();

  const handleFormSubmit = (values: SignInForm) => signIn(values);

  const renderForm = ({ handleSubmit }: FormRenderProps<SignInForm>) => (
    <div className={styles.SignInForm}>
      <h1>Sign In</h1>
      <AntForm onFinish={handleSubmit}>
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
            password
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
