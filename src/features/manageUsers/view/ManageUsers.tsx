import React, { useState, useEffect } from 'react';
import { Table, Button, Typography } from 'antd';

import { useApi } from 'utils/hooks/useApi';
import { User } from 'shared/types/models';

import styles from './ManageUsers.module.scss';

const { Text } = Typography;

export const ManageUsers = () => {
  const api = useApi();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const data = await api.users.getUsers();
      if (data.length === 0) {
        return;
      }
      setUsers(data.map((x, i) => ({
        ...x,
        key: i,
      })));
    } catch (e) {
      setError(e.response.data);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteUser = async (userId: string) => {
    try {
      setIsLoading(true);
      await api.users.deleteUser(userId);
    } catch (e) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  const makeEditUserHandler = (userId: string) => () => {

  };

  const makeDeleteUserHandler = (userId: string) => async () => {
    await deleteUser(userId);
    await fetchUsers();
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Surname',
      dataIndex: 'surname',
      key: 'surname',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Actions',
      dataIndex: '',
      key: 'x',
      render: (text: string, record: User) => (
        <>
          <Button type="link" onClick={makeEditUserHandler(record.id)}>
            Edit
          </Button>
          <Button type="link" onClick={makeDeleteUserHandler(record.id)}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  useEffect(() => {
    users.length === 0 && fetchUsers();
  });

  return (
    <div className={styles.UsersWrapper}>
      <Table dataSource={users} columns={columns} loading={isLoading} bordered />
      {error && <Text type="danger">{error}</Text>}
    </div>
  );
};
