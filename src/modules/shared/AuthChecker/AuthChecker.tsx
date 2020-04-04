import React, { useContext } from 'react';
import { Spin } from 'antd';

import { AuthContext } from 'services/auth';

import { Layout } from '../Layout/Layout';
import styles from './AuthChecker.module.scss';

export const AuthChecker: React.FC = ({ children }) => {
  const auth = useContext(AuthContext);

  return (
    <>
      {auth?.isLoading
        ? (
          <Layout withFooter>
            <div className={styles.Wrapper}>
              <Spin size="large" />
            </div>
          </Layout>
        )
        : children}
    </>
  );
};
