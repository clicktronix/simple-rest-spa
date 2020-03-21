import React from 'react';
import { Link } from 'react-router-dom';

import { routes } from 'modules/routes';

import { Layout } from '../../../shared/Layout/Layout';
import styles from './UnauthorizedLayout.module.scss';

export const UnauthorizedLayout = () => (
  <Layout withFooter>
    <div className={styles.Wrapper}>
      Sorry, but you need to
      {' '}
      <Link to={routes.authRoutes.SIGN_IN}>sign in</Link>
      {' '}
      to view this page.
    </div>
  </Layout>
);
