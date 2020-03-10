import React from 'react';

import { SignUp } from 'features/signUpUser/view/SignUpUser';

import { Layout } from '../../../shared/Layout/Layout';

export const SignUpLayout = () => (
  <Layout withFooter>
    <h1>Sign Up</h1>
    <SignUp />
  </Layout>
);
