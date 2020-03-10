import React from 'react';
import { Form, FormRenderProps } from 'react-final-form';

import { TextInputField } from 'shared/view/fields';
import { Button } from 'shared/view/components';
import { composeValidators, makeRequired } from 'shared/validators';

type SignInForm = {
  email: string;
  password: string;
};

export const SignIn = () => {
  const handleFormSubmit = (values: SignInForm) => console.info(values);

  const renderForm = ({ handleSubmit }: FormRenderProps<SignInForm>) => (
    <form onSubmit={handleSubmit}>
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
      <Button type="submit">Sign In</Button>
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
