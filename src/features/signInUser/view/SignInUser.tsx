import React, { useState, useContext } from 'react';
import { Form, FormRenderProps } from 'react-final-form';
import { Form as AntForm, Typography } from 'antd';
import { useHistory } from 'react-router';
import { useMountedState } from 'react-use';

import { TextInputField } from 'shared/view/fields';
import { Button } from 'shared/view/components';
import { composeValidators, makeRequired } from 'shared/validators';
import { useApi } from 'utils/hooks/useApi';
import { AuthContext } from 'services/auth';
import { routes } from 'modules/routes';

import styles from './SignInUser.module.scss';

const { Text } = Typography;

type SignInForm = {
  email: string;
  password: string;
};

export const SignIn = () => {
  const api = useApi();
  const history = useHistory();
  const isMounted = useMountedState();
  const auth = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const signIn = async (values: SignInForm) => {
    try {
      setIsLoading(true);
      const { data, tokens } = await api.auth.signIn(values);
      auth?.setAuth(data, tokens.accessToken, tokens.refreshToken);
      isMounted && history.push(routes.mainRoutes.MAIN);
    } catch (e) {
      isMounted && setError(e.message);
    } finally {
      isMounted && setIsLoading(false);
    }
  };

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
