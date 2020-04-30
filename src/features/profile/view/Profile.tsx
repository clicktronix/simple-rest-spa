import React, { useContext } from 'react';
import { Form, FormRenderProps } from 'react-final-form';
import { Form as AntForm, Typography } from 'antd';
import { useParams } from 'react-router';

import { AuthContext } from 'services/auth';
import { TextInputField } from 'shared/view/fields';
import { Button } from 'shared/view/components';

import styles from './Profile.module.scss';
import { useFetchUserProfile } from '../hooks/useFetchUserProfile';
import { ProfileForm } from '../types';
import { useUpdateProfile } from '../hooks/useUpdateProfile';

const { Text } = Typography;

export const Profile = () => {
  const initialUser = {
    name: '',
    surname: '',
    email: '',
    password: '',
    newPassword: '',
  };
  const auth = useContext(AuthContext);
  const { userId } = useParams();
  const { user, fetchUserError, isLoading } = useFetchUserProfile(userId || '', initialUser);
  const { updateProfile, updateError, isUpdating } = useUpdateProfile(userId || '');
  const isOwnProfile = userId === auth?.user?.id;
  const error = fetchUserError || updateError;

  const handleFormSubmit = (values: ProfileForm) => updateProfile(values);

  const renderForm = ({ handleSubmit }: FormRenderProps<ProfileForm>) => (
    <div className={styles.ProfileForm}>
      <h1>
        Edit
        {' '}
        {user?.name}
        {'\'s '}
        profile
      </h1>
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
        {isOwnProfile && (
          <>
            <AntForm.Item>
              <TextInputField
                name="password"
                placeholder="Enter your current password"
                password
              />
            </AntForm.Item>
            <AntForm.Item>
              <TextInputField
                name="newPassword"
                placeholder="Enter your new password"
                password
              />
            </AntForm.Item>
          </>
        )}
        <AntForm.Item>
          <Button type="primary" htmlType="submit" loading={isLoading || isUpdating}>
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
      initialValues={user}
      subscription={{}}
    />
  );
};
