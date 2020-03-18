import React from 'react';

import { DisplayUsers } from 'features/displayUsers/view/DisplayUsers';

import { Layout } from '../../shared/Layout/Layout';

export const UsersLayout = () => (
  <Layout withFooter>
    <h1>Users page</h1>
    <DisplayUsers />
  </Layout>
);
