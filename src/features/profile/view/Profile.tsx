import React, { useContext, useEffect, useCallback } from 'react';
import { Form, FormRenderProps } from 'react-final-form';
import { Form as AntForm, Typography } from 'antd';
import { useParams } from 'react-router';
import { useMountedState } from 'react-use';

import { AuthContext } from 'services/auth';
import { TextInputField } from 'shared/view/fields';
import { Button } from 'shared/view/components';
import { useApi } from 'shared/hooks/useApi';
import { UpdateUser } from 'shared/types/models';
import { useValidState } from 'shared/hooks/useValidState';

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
  const initialUser = {
    name: '',
    surname: '',
    email: '',
    password: '',
    newPassword: '',
  };
  const api = useApi();
  const auth = useContext(AuthContext);
  const { userId } = useParams();
  const isMounted = useMountedState();
  const [error, setError] = useValidState(isMounted, '');
  const [user, setUser] = useValidState<UpdateUser>(isMounted, initialUser);
  const [isLoading, setIsLoading] = useValidState(isMounted, false);
  const isOwnProfile = userId === auth?.user?.id;

  const fetchUserProfile = useCallback(async () => {
    if (userId) {
      try {
        setIsLoading(true);
        const usr = await api.users.getUser(userId);
        setUser(state => ({
          ...state, ...usr,
        }));
        setError('');
      } catch (e) {
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    }
  }, [api.users, setError, setIsLoading, setUser, userId]);

  const updateProfile = async (values: ProfileForm) => {
    try {
      setIsLoading(true);
      userId && await api.users.updateUser(userId, {
        ...values, id: userId,
      });
      setError('');
    } catch (e) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

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
      initialValues={user}
      subscription={{}}
    />
  );
};
