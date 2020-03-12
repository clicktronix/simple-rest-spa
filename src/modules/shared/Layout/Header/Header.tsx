import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'antd';
import { ClickParam } from 'antd/lib/menu';

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

  const handleClick = (e: ClickParam) => {
    setActiveTab(e.key);
  };

  return (
    <header>
      <Menu onClick={handleClick} selectedKeys={[activeTab]} mode="horizontal">
        {menuItems.map(({ route, title }) => (
          <Menu.Item key={route}>
            <Link to={route} key={route}>
              {title}
            </Link>
          </Menu.Item>
        ))}
        <Menu.Item key={routes.authRoutes.SIGN_IN} className={styles.Button}>
          <Link to={routes.authRoutes.SIGN_IN}>
            Sign In
          </Link>
        </Menu.Item>
        <Menu.Item key={routes.authRoutes.SIGN_UP} className={styles.Button}>
          <Link to={routes.authRoutes.SIGN_UP}>
            Sign Up
          </Link>
        </Menu.Item>
      </Menu>
    </header>
  );
};
