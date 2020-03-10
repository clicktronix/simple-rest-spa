import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Button } from 'shared/view/components';

import { routes } from '../../../routes';
import styles from './Header.module.scss';

const menuItems = [{
  route: routes.mainRoutes.MAIN, title: 'Main',
}, {
  route: routes.userRoutes.USERS, title: 'Users',
}];

export const Header = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname);

  const handleTabChange = (newTabValue: string) => () => {
    setActiveTab(newTabValue);
  };

  return (
    <div className={styles.Header}>
      <div className={styles.LeftSide}>
        {menuItems.map(({ route, title }) => (
          <Link to={route} key={route} className={styles.MenuItem}>
            <Button
              onClick={handleTabChange(route)}
              color={activeTab === route ? 'primary' : 'default'}
            >
              {title}
            </Button>
          </Link>
        ))}
      </div>
      <div className={styles.RightSide}>
        <Link to={routes.authRoutes.SIGN_IN}>
          <Button>Sign In</Button>
        </Link>
        <Link to={routes.authRoutes.SIGN_UP}>
          <Button>Sign Up</Button>
        </Link>
      </div>
    </div>
  );
};
