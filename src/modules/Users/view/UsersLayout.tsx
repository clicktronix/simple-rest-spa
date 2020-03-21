import React from 'react';

import { ManageUsers } from 'features/manageUsers/view/ManageUsers/ManageUsers';

import { Layout } from '../../shared/Layout/Layout';

export const UsersLayout = () => (
  <Layout withFooter>
    <ManageUsers />
  </Layout>
);
