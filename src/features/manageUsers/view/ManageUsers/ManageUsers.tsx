import React, { useState, useEffect, useCallback } from 'react';
import { Table, Button, Typography } from 'antd';
import { useHistory } from 'react-router';
import { useMountedState } from 'react-use';

import { useApi } from 'utils/hooks/useApi';
import { User } from 'shared/types/models';
import { routes } from 'modules/routes';

import styles from './ManageUsers.module.scss';

const { Text } = Typography;

export const ManageUsers = () => {
  const api = useApi();
  const history = useHistory();
  const isMounted = useMountedState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await api.users.getUsers();
      isMounted() && setUsers(data.map((x, i) => ({
        ...x,
        key: i,
      })));
      isMounted() && setError('');
    } catch (e) {
      isMounted() && setError(e.message);
    } finally {
      isMounted() && setIsLoading(false);
    }
  }, [api.users, isMounted]);

  const deleteUser = async (userId: string) => {
    try {
      setIsLoading(true);
      await api.users.deleteUser(userId);
      isMounted() && setError('');
    } catch (e) {
      isMounted() && setError(e.message);
    } finally {
      isMounted() && setIsLoading(false);
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
