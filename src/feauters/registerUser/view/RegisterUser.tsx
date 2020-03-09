import React from 'react';
import { Form, FormRenderProps } from 'react-final-form';

import { TextInputField } from 'shared/view/fields';
import { Button } from 'shared/view/components';
import { composeValidators, makeRequired } from 'shared/validators';

type RegisterForm = {
  name: string;
  surname: string;
  email: string;
  password: string;
};

export const RegisterUser = () => {
  const handleFormSubmit = (values: RegisterForm) => console.info(values);

  const renderForm = ({ handleSubmit }: FormRenderProps<RegisterForm>) => (
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
      <Button type="submit">Register</Button>
    </form>
  );

  return (
    <Form<RegisterForm>
      onSubmit={handleFormSubmit}
      render={renderForm}
      subscription={{}}
    />
  );
};
