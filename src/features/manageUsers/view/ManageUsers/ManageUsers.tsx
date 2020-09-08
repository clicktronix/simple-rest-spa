import React from 'react';
import { Table, Typography } from 'antd';
import { useHistory } from 'react-router';
import { useMountedState } from 'react-use';

import { User } from 'shared/types/models';
import { routes } from 'modules/routes';
import { useValidState } from 'shared/hooks/useValidState';
import { Button } from 'shared/view/components';
import { useFetchUsers } from 'features/manageUsers/hooks/useFetchUsers';
import { useDeleteUser } from 'features/manageUsers/hooks/useDeleteUser';

import styles from './ManageUsers.module.scss';
import { DeleteConfirmModal } from '../DeleteConfirmModal/DeleteConfirmModal';

const { Text } = Typography;

export const ManageUsers = () => {
  const history = useHistory();
  const isMounted = useMountedState();
  const { users, isLoading, fetchUsersError, fetchUsers } = useFetchUsers();
  const { deleteUser, isDeleting, deleteUserError } = useDeleteUser();
  const [isShowModal, setSetIsShowModal] = useValidState(isMounted, false);
  const [userToBeDeleted, setUserToBeDeleted] = useValidState(isMounted, '');
  const loading = isLoading || isDeleting;
  const error = fetchUsersError || deleteUserError;

  const openModal = () => {
    setSetIsShowModal(true);
  };

  const closeModal = () => {
    setSetIsShowModal(false);
  };

  const makeEditUserHandler = (userId: string) => () => {
    history.push(`${routes.profileRoutes.PROFILE}/${userId}`);
  };

  const makeDeleteUserHandler = (userId: string) => async () => {
    setUserToBeDeleted(userId);
    openModal();
  };

  const onDelete = () => {
    deleteUser(userToBeDeleted).then(() => fetchUsers());
    closeModal();
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
      <Table dataSource={users} columns={columns} loading={loading} bordered />
      {error && <Text type="danger">{error}</Text>}
      <DeleteConfirmModal
        onDelete={onDelete}
        onCancel={closeModal}
        isShowModal={isShowModal}
      />
    </div>
  );
};
