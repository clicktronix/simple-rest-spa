import React from 'react';
import { Form, FormRenderProps } from 'react-final-form';
import { Form as AntForm, Typography } from 'antd';
import { useMountedState } from 'react-use';

import { TextInputField } from 'shared/view/fields';
import { Button } from 'shared/view/components';
import { composeValidators, makeRequired } from 'shared/validators';
import { useApi } from 'shared/hooks/useApi';
import { useValidState } from 'shared/hooks/useValidState';

import styles from './SignUpUser.module.scss';

const { Text } = Typography;

type SignUpForm = {
  name: string;
  surname: string;
  email: string;
  password: string;
};

export const SignUp = () => {
  const api = useApi();
  const isMounted = useMountedState();
  const [isLoading, setIsLoading] = useValidState(isMounted, false);
  const [error, setError] = useValidState(isMounted, '');
  const [success, setSuccess] = useValidState(isMounted, '');

  const signUp = async (values: SignUpForm) => {
    try {
      setIsLoading(true);
      await api.auth.signUp(values);
      setSuccess('User successfully registered.');
      setError('');
    } catch (e) {
      setSuccess('');
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

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
