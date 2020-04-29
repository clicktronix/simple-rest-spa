import React from 'react';
import { Form, FormRenderProps } from 'react-final-form';
import { Form as AntForm, Typography } from 'antd';

import { TextInputField } from 'shared/view/fields';
import { Button } from 'shared/view/components';
import { composeValidators, makeRequired } from 'shared/validators';

import styles from './SignUpUser.module.scss';
import { useSignUp } from '../hooks/useSignUp';
import { SignUpForm } from '../types';

const { Text } = Typography;

export const SignUp = () => {
  const { signUp, isLoading, success, error } = useSignUp();

  const handleFormSubmit = (values: SignUpForm) => signUp(values);

  const renderForm = ({ handleSubmit }: FormRenderProps<SignUpForm>) => (
    <div className={styles.SignUpForm}>
      <h1>Sign Up</h1>
      <AntForm onFinish={handleSubmit} className={styles.SignInForm}>
        <AntForm.Item>
          <TextInputField
            name="name"
            placeholder="Enter your name"
            validate={composeValidators(
              makeRequired('Field required'),
            )}
          />
        </AntForm.Item>
        <AntForm.Item>
          <TextInputField
            name="surname"
            placeholder="Enter your surname"
            validate={composeValidators(
              makeRequired('Field required'),
            )}
          />
        </AntForm.Item>
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
            Sign Up
          </Button>
        </AntForm.Item>
        {error && <Text type="danger">{error}</Text>}
        {success && <Text type="secondary">{success}</Text>}
      </AntForm>
    </div>
  );

  return (
    <Form<SignUpForm>
      onSubmit={handleFormSubmit}
      render={renderForm}
      subscription={{}}
    />
  );
};
