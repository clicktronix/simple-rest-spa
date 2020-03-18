import React, { useContext, useState } from 'react';
import { Form, FormRenderProps } from 'react-final-form';
import { Form as AntForm, Typography } from 'antd';

import { AuthContext } from 'services/auth';
import { TextInputField } from 'shared/view/fields';
import { Button } from 'shared/view/components';
import { useApi } from 'utils/hooks/useApi';

import styles from './Profile.module.scss';

type ProfileForm = {
  name: string;
  surname: string;
  email: string;
  password: string;
  newPassword: string;
};

const { Text } = Typography;

export const Profile = () => {
  const api = useApi();
  const auth = useContext(AuthContext);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const initialValues: ProfileForm = {
    name: '',
    surname: '',
    email: '',
    password: '',
    newPassword: '',
    ...auth?.user,
  };

  const updateProfile = async (values: ProfileForm) => {
    try {
      setIsLoading(true);
      auth?.user?.id && await api.users.updateUser(auth.user.id, {
        ...values, id: auth.user.id,
      });
    } catch (e) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (values: ProfileForm) => updateProfile(values);

  const renderForm = ({ handleSubmit }: FormRenderProps<ProfileForm>) => (
    <div className={styles.ProfileForm}>
      <h1>Users profile</h1>
      <AntForm onFinish={handleSubmit}>
        <AntForm.Item>
          <TextInputField
            name="name"
            placeholder="Enter your name"
          />
        </AntForm.Item>
        <AntForm.Item>
          <TextInputField
            name="surname"
            placeholder="Enter your surname"
          />
        </AntForm.Item>
        <AntForm.Item>
          <TextInputField
            name="email"
            placeholder="Enter your email"
          />
        </AntForm.Item>
        <AntForm.Item>
          <TextInputField
            name="password"
            placeholder="Enter your current password"
          />
        </AntForm.Item>
        <AntForm.Item>
          <TextInputField
            name="password"
            placeholder="Enter your new password"
          />
        </AntForm.Item>
        <AntForm.Item>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Save
          </Button>
        </AntForm.Item>
        {error && <Text type="danger">{error}</Text>}
      </AntForm>
    </div>
  );

  return (
    <Form<ProfileForm>
      onSubmit={handleFormSubmit}
      render={renderForm}
      initialValues={initialValues}
      subscription={{}}
    />
  );
};
