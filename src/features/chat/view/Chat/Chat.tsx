import React, { useState } from 'react';
import cn from 'classnames';
import { Form, FormRenderProps } from 'react-final-form';
import { Typography, Button } from 'antd';

import { TextInputField } from 'shared/view/fields';

import styles from './Chat.module.scss';
import { ChatMessage } from '../ChatMessage/ChatMessage';

type ChatForm = {
  message: string;
};

const { Text } = Typography;

export const Chat = () => {
  const [isRollUp, setIsRollUp] = useState(false);
  const [isLoading] = useState(false);
  const [error] = useState('');
  const [messages, setMessages] = useState<string[]>([]);

  const handleFormSubmit = (values: ChatForm) => {
    setMessages(state => [...state, values.message]);
  };

  const onHeaderClick = () => {
    setIsRollUp(state => !state);
  };

  const renderForm = ({ handleSubmit }: FormRenderProps<ChatForm>) => (
    <form onSubmit={handleSubmit} autoComplete="off">
      <div
        className={cn(
          styles.Content,
          {
            [styles.SlideUp]: isRollUp,
            [styles.SlideDown]: !isRollUp,
          },
        )}
      >
        {messages.map((x, i) => (
          <ChatMessage key={i}>
            {x}
          </ChatMessage>
        ))}
      </div>
      <div
        className={cn(
          styles.InputWrapper,
          {
            [styles.SlideUp]: isRollUp,
            [styles.SlideDown]: !isRollUp,
          },
        )}
      >
        <TextInputField
          name="message"
          placeholder="Enter your message"
        />
        <Button type="primary" htmlType="submit" loading={isLoading}>
          Send
        </Button>
      </div>
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
