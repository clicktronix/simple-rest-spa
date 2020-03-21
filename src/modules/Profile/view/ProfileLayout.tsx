import React from 'react';

import { Profile } from 'features/profile/view/Profile';

import { Layout } from '../../shared/Layout/Layout';

export const ProfileLayout = () => (
  <Layout withFooter>
    <Profile />
  </Layout>
);
