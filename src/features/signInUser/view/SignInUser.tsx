import React from 'react';
import { Form, FormRenderProps } from 'react-final-form';

import { TextInputField } from 'shared/view/fields';
import { Button } from 'shared/view/components';
import { composeValidators, makeRequired } from 'shared/validators';
import { api } from 'services/api/Api';

import styles from './SignInUser.module.scss';

type SignInForm = {
  email: string;
  password: string;
};

export const SignIn = () => {
  const singIn = async (values: SignInForm) => {
    try {
      await api.users.signIn(values);
    } catch (e) {
      console.error(e);
    }
  };

  const handleFormSubmit = (values: SignInForm) => singIn(values);

  const renderForm = ({ handleSubmit }: FormRenderProps<SignInForm>) => (
    <form onSubmit={handleSubmit} className={styles.SignInForm}>
      <TextInputField
        name="email"
        validate={composeValidators(
          makeRequired('Field required'),
        )}
      />
      <TextInputField
        name="password"
        validate={composeValidators(
          makeRequired('Field required'),
        )}
      />
      <div className={styles.SubmitButton}>
        <Button type="primary" htmlType="submit">Sign In</Button>
      </div>
    </form>
  );

  return (
    <Form<SignInForm>
      onSubmit={handleFormSubmit}
      render={renderForm}
      subscription={{}}
    />
  );
};
