import React, { useContext } from 'react';

import { AuthContext } from 'services/auth';

import styles from './Profile.module.scss';

export const Profile = () => {
  const auth = useContext(AuthContext);

  return (
    <div className={styles.ProfileWrapper}>
      <h1>Users profile</h1>
      {auth?.user?.email}
    </div>
  );
};
