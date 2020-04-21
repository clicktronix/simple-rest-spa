import React, { useContext } from 'react';
import cn from 'classnames';
import { useHistory } from 'react-router';

import { Message } from 'shared/types/models';
import { AuthContext } from 'services/auth';
import { routes } from 'modules/routes';

import styles from './ChatMessage.module.scss';

type ChatMessageProps = {
  message: Message;
};

export const ChatMessage = ({ message }: ChatMessageProps) => {
  const auth = useContext(AuthContext);
  const history = useHistory();

  const onNameClick = () => {
    history.push(`${routes.profileRoutes.PROFILE}/${message.sender.id}`);
  };

  return (
    <div className={cn(styles.Wrapper, { [styles.OwnMessage]: Boolean(message.sender.email === auth?.user?.email) })}>
      <span className={styles.SenderName} onClick={onNameClick}>{message.sender.name}</span>
      {message.content}
    </div>
  );
};
