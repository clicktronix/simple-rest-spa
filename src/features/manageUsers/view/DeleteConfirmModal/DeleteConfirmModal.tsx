import React from 'react';

import { Modal } from 'shared/view/components/Modal/Modal';

type DeleteConfirmModalProps = {
  isShowModal: boolean;
  onDelete: () => void;
  onCancel: () => void;
};

export const DeleteConfirmModal = ({ onDelete, onCancel, isShowModal }: DeleteConfirmModalProps) => (
  <Modal
    title="Delete user"
    visible={isShowModal}
    onOk={onDelete}
    onCancel={onCancel}
  >
    Are you sure you want to delete this user?
  </Modal>
);
