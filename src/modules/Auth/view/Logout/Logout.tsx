import React, { useContext, useCallback, useEffect } from 'react';
import { useMountedState } from 'react-use';
import { Spin, Typography } from 'antd';
import { useHistory } from 'react-router';

import { AuthContext } from 'services/auth';
import { useValidState } from 'shared/hooks/useValidState';
import { ApiContext } from 'services/api';
import { routes } from 'modules/routes';

import { Layout } from '../../../shared/Layout/Layout';
import styles from './Logout.module.scss';

export const Logout = () => {
  const api = useContext(ApiContext);
  const auth = useContext(AuthContext);
  const history = useHistory();
  const isMounted = useMountedState();
  const [isLoading, setIsLoading] = useValidState(isMounted, false);
  const [error, setError] = useValidState(isMounted, '');

  const fetchLogout = useCallback(async () => {
    try {
      setIsLoading(true);
      await api?.auth.logout();
      history.push(routes.mainRoutes.MAIN);
      auth?.resetAuth();
      setError('');
    } catch (e) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  }, [api, auth, history, setError, setIsLoading]);

  useEffect(() => {
    fetchLogout();
  }, [fetchLogout]);

  return (
    <Layout withFooter>
      <div className={styles.Wrapper}>
        {isLoading && <Spin size="large" />}
        {error && <Typography.Text type="danger">{error}</Typography.Text>}
      </div>
    </Layout>
  );
};
