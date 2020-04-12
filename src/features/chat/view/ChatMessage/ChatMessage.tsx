import React from 'react';

import styles from './ChatMessage.module.scss';

export const ChatMessage: React.FC = ({ children }) => (
  <div className={styles.Wrapper}>
    {children}
  </div>
);
