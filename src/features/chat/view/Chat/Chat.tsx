import React, { useState, useContext, useEffect } from 'react';
import cn from 'classnames';
import { Form, FormRenderProps } from 'react-final-form';
import { Typography, Button } from 'antd';

import { TextInputField } from 'shared/view/fields';
import { useApi } from 'shared/hooks/useApi';
import { AuthContext } from 'services/auth';
import { MessageResponse } from 'services/api/types/models/message';
import { Message } from 'shared/types/models';

import styles from './Chat.module.scss';
import arrow from './img/arrow.png';
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
    const observable = api.socket.onMessage();
    observable.subscribe((m: MessageResponse) => {
      setMessages(state => [m, ...state]);
    });
  }, [api.socket]);

  const renderForm = ({ handleSubmit }: FormRenderProps<ChatForm>) => (
    <form onSubmit={handleSubmit} autoComplete="off">
      <div
        className={cn(styles.Content, {
          [styles.SlideUp]: isRollUp,
          [styles.SlideDown]: !isRollUp,
        })}
      >
        {auth?.user && (
          <div className={cn(styles.InputWrapper)}>
            <TextInputField
              name="message"
              placeholder="Enter your message"
            />
            <Button type="primary" htmlType="submit" loading={isLoading} className={styles.SendButton}>
              Send
            </Button>
          </div>
        )}
        {error && <Text type="danger">{error}</Text>}
        <div className={styles.Messages}>
          {messages.map((x, i) => (
            <ChatMessage
              key={`${x.sender.email}_${i}`}
              className={cn({ [styles.OwnMessage]: x.sender.email === auth?.user?.email })}
            >
              {x.content}
            </ChatMessage>
          ))}
        </div>
      </div>
    </form>
  );

  return (
    <div className={styles.Window}>
      <div className={styles.Header} onClick={onHeaderClick}>
        <img src={arrow} className={cn(styles.Arrow, { [styles.RotatedArrow]: isRollUp })} alt="arrow" />
      </div>
      <Form<ChatForm>
        onSubmit={handleFormSubmit}
        render={renderForm}
        subscription={{}}
      />
    </div>
  );
};
