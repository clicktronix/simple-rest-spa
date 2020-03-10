import React from 'react';
import { Link } from 'react-router-dom';

import { Button } from 'shared/view/components';

import { routes } from '../../../routes';
import styles from './Header.module.scss';

const menuItems = [{
  route: routes.mainRoutes.MAIN, title: 'Main',
}, {
  route: routes.userRoutes.USERS, title: 'Users',
}];

export const Header = () => (
  <div className={styles.Header}>
    <div className={styles.LeftSide}>
      {menuItems.map(({ route, title }) => (
        <Link to={route} key={route}>
          <Button color="primary">
            {title}
          </Button>
        </Link>
      ))}
    </div>
    <div className={styles.RightSide}>
      <Link to={routes.authRoutes.SIGN_IN}>
        <Button color="primary">Sign In</Button>
      </Link>
      <Link to={routes.authRoutes.SIGN_UP}>
        <Button color="primary">Sign Up</Button>
      </Link>
    </div>
  </div>
);
