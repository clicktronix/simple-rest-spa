import React from 'react';

import { ManageUsers } from 'features/manageUsers/view/ManageUsers/ManageUsers';
import { Chat } from 'features/chat/view/Chat/Chat';

import { Layout } from '../../shared/Layout/Layout';

export const UsersLayout = () => (
  <Layout withFooter>
    <ManageUsers />
    <Chat isHidden />
  </Layout>
);
