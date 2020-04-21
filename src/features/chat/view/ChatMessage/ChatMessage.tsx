import React from 'react';
import cn from 'classnames';

import styles from './ChatMessage.module.scss';

type ChatMessageProps = {
  children: React.ReactNode;
  className: string;
};

export const ChatMessage = ({ children, className }: ChatMessageProps) => (
  <div className={cn(className, styles.Wrapper)}>
    {children}
  </div>
);
