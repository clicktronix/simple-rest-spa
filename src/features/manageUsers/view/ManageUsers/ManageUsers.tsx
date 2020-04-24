import React, { useEffect, useCallback } from 'react';
import { Table, Button, Typography } from 'antd';
import { useHistory } from 'react-router';
import { useMountedState } from 'react-use';

import { useApi } from 'shared/hooks/useApi';
import { User } from 'shared/types/models';
import { routes } from 'modules/routes';
import { useValidState } from 'shared/hooks/useValidState';

import styles from './ManageUsers.module.scss';

const { Text } = Typography;

export const ManageUsers = () => {
  const api = useApi();
  const history = useHistory();
  const isMounted = useMountedState();
  const [isLoading, setIsLoading] = useValidState(isMounted, false);
  const [error, setError] = useValidState(isMounted, '');
  const [users, setUsers] = useValidState<User[]>(isMounted, []);

  const fetchUsers = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await api.users.getUsers();
      setUsers(data.map((x, i) => ({
        ...x,
        key: i,
      })));
      setError('');
    } catch (e) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  }, [api.users, setError, setIsLoading, setUsers]);

  const deleteUser = async (userId: string) => {
    try {
      setIsLoading(true);
      await api.users.deleteUser(userId);
      setError('');
    } catch (e) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  const makeEditUserHandler = (userId: string) => () => {
    history.push(`${routes.profileRoutes.PROFILE}/${userId}`);
  };

  const makeDeleteUserHandler = (userId: string) => async () => {
    await deleteUser(userId);
    await fetchUsers();
  };

  const columns = [{
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  }, {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  }, {
    title: 'Surname',
    dataIndex: 'surname',
    key: 'surname',
  }, {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  }, {
    title: 'Actions',
    dataIndex: '',
    key: 'x',
    render: (_: string, record: User) => (
      <>
        <Button type="link" onClick={makeEditUserHandler(record.id)}>
          Edit
        </Button>
        <Button type="link" onClick={makeDeleteUserHandler(record.id)}>
          Delete
        </Button>
      </>
    ),
  }];

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <div className={styles.UsersWrapper}>
      <Table dataSource={users} columns={columns} loading={isLoading} bordered />
      {error && <Text type="danger">{error}</Text>}
    </div>
  );
};
