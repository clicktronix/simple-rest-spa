import React from 'react';
import { Form, FormRenderProps } from 'react-final-form';

import { TextInputField } from 'shared/view/fields';
import { Button } from 'shared/view/components';
import { composeValidators, makeRequired } from 'shared/validators';

import styles from './SignInUser.module.scss';

type SignInForm = {
  email: string;
  password: string;
};

export const SignIn = () => {
  const handleFormSubmit = (values: SignInForm) => console.info(values);

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
        <Button type="submit">Sign In</Button>
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
