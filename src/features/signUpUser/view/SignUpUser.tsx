import React from 'react';
import { Form, FormRenderProps } from 'react-final-form';

import { TextInputField } from 'shared/view/fields';
import { Button } from 'shared/view/components';
import { composeValidators, makeRequired } from 'shared/validators';
import { api } from 'services/api/Api';

import styles from './SignUpUser.module.scss';

type SignUpForm = {
  name: string;
  surname: string;
  email: string;
  password: string;
};

export const SignUp = () => {
  const singUp = async (values: SignUpForm) => {
    try {
      await api.users.signUp(values);
    } catch (e) {
      console.error(e);
    }
  };

  const handleFormSubmit = (values: SignUpForm) => singUp(values);

  const renderForm = ({ handleSubmit }: FormRenderProps<SignUpForm>) => (
    <form onSubmit={handleSubmit} className={styles.SignUpForm}>
      <TextInputField
        name="name"
        validate={composeValidators(
          makeRequired('Field required'),
        )}
      />
      <TextInputField
        name="surname"
        validate={composeValidators(
          makeRequired('Field required'),
        )}
      />
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
        <Button type="submit">Sign Up</Button>
      </div>
    </form>
  );

  return (
    <Form<SignUpForm>
      onSubmit={handleFormSubmit}
      render={renderForm}
      subscription={{}}
    />
  );
};
