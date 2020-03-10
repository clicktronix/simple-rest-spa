import React from 'react';

import { SignIn } from 'features/signInUser/view/SignInUser';

import { Layout } from '../../../shared/Layout/Layout';

export const SignInLayout = () => (
  <Layout withFooter>
    <SignIn />
  </Layout>
);
