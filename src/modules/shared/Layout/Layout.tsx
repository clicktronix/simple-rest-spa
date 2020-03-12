import React, { ReactChild } from 'react';

import styles from './Layout.module.scss';
import { Header } from './Header/Header';

type Props = {
  withFooter: boolean;
  children: ReactChild | ReactChild[];
};

export const Layout = ({ withFooter, children }: Props) => (
  <div className={styles.Wrapper}>
    <Header />
    <main className={styles.Content}>{children}</main>
    {withFooter && (
      <footer className={styles.Footer}>clicktronix@hotmail.com</footer>
    )}
  </div>
);
