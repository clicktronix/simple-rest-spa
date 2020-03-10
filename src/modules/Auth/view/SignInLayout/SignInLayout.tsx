import React from 'react';

import { SignIn } from 'features/singInUser/view/SingInUser';

import { Layout } from '../../../shared/Layout/Layout';

export const SignInLayout = () => (
  <Layout withFooter>
    <h1>Sign In</h1>
    <SignIn />
  </Layout>
);
