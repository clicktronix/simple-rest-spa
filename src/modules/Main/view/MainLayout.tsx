import React from 'react';

import { Chat } from 'features/chat/view/Chat/Chat';

import { Layout } from '../../shared/Layout/Layout';
import styles from './MainLayout.module.scss';

export const MainLayout = () => (
  <Layout withFooter>
    <div className={styles.Wrapper}>
      <h1>Main page</h1>
      <Chat />
    </div>
  </Layout>
);
