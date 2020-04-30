import React, { useCallback } from 'react';
import { Table, Typography } from 'antd';
import { useHistory } from 'react-router';
import { useMountedState } from 'react-use';

import { useApi } from 'shared/hooks/useApi';
import { User } from 'shared/types/models';
import { routes } from 'modules/routes';
import { useValidState } from 'shared/hooks/useValidState';
import { Button } from 'shared/view/components';
import { useFetchUsers } from 'features/manageUsers/hooks/useFetchUsers';

import styles from './ManageUsers.module.scss';
import { DeleteConfirmModal } from '../DeleteConfirmModal/DeleteConfirmModal';

const { Text } = Typography;

export const ManageUsers = () => {
  const api = useApi();
  const history = useHistory();
  const isMounted = useMountedState();
  const [isLoading, setIsLoading] = useValidState(isMounted, false);
  const [error, setError] = useValidState(isMounted, '');
  const { users } = useFetchUsers();
  const [isShowModal, setSetIsShowModal] = useValidState(isMounted, false);
  const [userToBeDeleted, setUserToBeDeleted] = useValidState(isMounted, '');

  const openModal = useCallback(() => {
    setSetIsShowModal(true);
  }, [setSetIsShowModal]);

  const closeModal = useCallback(() => {
    setSetIsShowModal(false);
  }, [setSetIsShowModal]);

  const deleteUser = useCallback(async () => {
    try {
      setIsLoading(true);
      await api.users.deleteUser(userToBeDeleted);
      closeModal();
      setError('');
    } catch (e) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  }, [api.users, closeModal, setError, setIsLoading, userToBeDeleted]);

  const makeEditUserHandler = (userId: string) => () => {
    history.push(`${routes.profileRoutes.PROFILE}/${userId}`);
  };

  const makeDeleteUserHandler = (userId: string) => async () => {
    setUserToBeDeleted(userId);
    openModal();
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

  return (
    <div className={styles.UsersWrapper}>
      <Table dataSource={users} columns={columns} loading={isLoading} bordered />
      {error && <Text type="danger">{error}</Text>}
      <DeleteConfirmModal
        onDelete={deleteUser}
        onCancel={closeModal}
        isShowModal={isShowModal}
      />
    </div>
  );
};
