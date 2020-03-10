import React from 'react';
import { Form, FormRenderProps } from 'react-final-form';

import { TextInputField } from 'shared/view/fields';
import { Button } from 'shared/view/components';
import { composeValidators, makeRequired } from 'shared/validators';

type SignUpForm = {
  name: string;
  surname: string;
  email: string;
  password: string;
};

export const SignUp = () => {
  const handleFormSubmit = (values: SignUpForm) => console.info(values);

  const renderForm = ({ handleSubmit }: FormRenderProps<SignUpForm>) => (
    <form onSubmit={handleSubmit}>
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
      <Button type="submit">Sign Up</Button>
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
