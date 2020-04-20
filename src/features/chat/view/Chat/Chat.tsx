import React, { useState, useContext, useEffect } from 'react';
import cn from 'classnames';
import { Form, FormRenderProps } from 'react-final-form';
import { Typography, Button } from 'antd';

import { TextInputField } from 'shared/view/fields';
import { useApi } from 'utils/hooks/useApi';
import { AuthContext } from 'services/auth';
import { MessageResponse } from 'services/api/types/models/message';
import { Message } from 'shared/types/models';

import styles from './Chat.module.scss';
import { ChatMessage } from '../ChatMessage/ChatMessage';

type ChatForm = {
  message: string;
};

const { Text } = Typography;

export const Chat = () => {
  const api = useApi();
  const auth = useContext(AuthContext);
  const [isRollUp, setIsRollUp] = useState(false);
  const [isLoading] = useState(false);
  const [error] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  const handleFormSubmit = (values: ChatForm) => {
    auth?.user && api.socket.sendMessage({
      content: values.message, sender: auth.user,
    });
  };

  const onHeaderClick = () => {
    setIsRollUp(state => !state);
  };

  useEffect(() => {
    api.socket.init();
    const observable = api.socket.onMessage();
    observable.subscribe((m: MessageResponse) => {
      setMessages(state => [...state, m]);
    });

    return () => api.socket.disconnect();
  });

  const renderForm = ({ handleSubmit }: FormRenderProps<ChatForm>) => (
    <form onSubmit={handleSubmit} autoComplete="off">
      <div
        className={cn(styles.Content, {
          [styles.SlideUp]: isRollUp,
          [styles.SlideDown]: !isRollUp,
        })}
      >
        {messages.map((x, i) => (
          <ChatMessage key={i}>
            {x}
          </ChatMessage>
        ))}
      </div>
      {auth?.user && (
        <div
          className={cn(styles.InputWrapper, {
            [styles.SlideUp]: isRollUp,
            [styles.SlideDown]: !isRollUp,
          })}
        >
          <TextInputField
            name="message"
            placeholder="Enter your message"
          />
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Send
          </Button>
        </div>
      )}
      {error && <Text type="danger">{error}</Text>}
    </form>
  );

  return (
    <div className={styles.Window}>
      <div className={styles.Header} onClick={onHeaderClick}>
        Chat
      </div>
      <Form<ChatForm>
        onSubmit={handleFormSubmit}
        render={renderForm}
        subscription={{}}
      />
    </div>
  );
};
