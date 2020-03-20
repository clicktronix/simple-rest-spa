import React from 'react';
import { Modal as AntModal } from 'antd';

type ModalProps = {
  title: string;
  visible: boolean;
  children?: React.ReactChild;
  onOk: () => void;
  onCancel: () => void;
};

export const Modal = ({ title, visible, children, onOk, onCancel }: ModalProps) => (
  <AntModal
    title={title}
    visible={visible}
    onOk={onOk}
    onCancel={onCancel}
  >
    {children}
  </AntModal>
);
