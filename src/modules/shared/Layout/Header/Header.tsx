import React, { useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'antd';
import { MenuInfo } from 'rc-menu/lib/interface';

import { AuthContext } from 'services/auth';

import { routes } from '../../../routes';
import styles from './Header.module.scss';

const menuItems = [{
  route: routes.mainRoutes.MAIN, title: 'Main',
}, {
  route: routes.userRoutes.USERS, title: 'Users',
}];

export const Header = () => {
  const auth = useContext(AuthContext);
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<React.Key>(location.pathname);

  const handleClick = (e: MenuInfo) => {
    setActiveTab(e.key);
  };

  return (
    <header>
      <Menu onClick={handleClick} selectedKeys={[activeTab.toString()]} mode="horizontal">
        {menuItems.map(({ route, title }) => (
          <Menu.Item key={route}>
            <Link to={route} key={route}>
              {title}
            </Link>
          </Menu.Item>
        ))}
        {auth?.user
          ? (
            <Menu.SubMenu
              title={auth.user.email}
              key={routes.profileRoutes.PROFILE}
              className={styles.Button}
            >
              <Menu.Item>
                <Link to={`${routes.profileRoutes.PROFILE}/${auth.user.id}`}>
                  Profile
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link to={routes.authRoutes.LOGOUT}>
                  Logout
                </Link>
              </Menu.Item>
            </Menu.SubMenu>
          )
          : (
            <Menu.Item key={routes.authRoutes.SIGN_IN} className={styles.Button}>
              <Link to={routes.authRoutes.SIGN_IN}>
                Sign In
              </Link>
            </Menu.Item>
          )}
        {!auth?.user && (
          <Menu.Item key={routes.authRoutes.SIGN_UP} className={styles.Button}>
            <Link to={routes.authRoutes.SIGN_UP}>
              Sign Up
            </Link>
          </Menu.Item>
        )}
      </Menu>
    </header>
  );
};
