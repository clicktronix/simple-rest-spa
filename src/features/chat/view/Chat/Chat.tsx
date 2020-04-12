import React, { useState } from 'react';
import cn from 'classnames';
import { Form, FormRenderProps } from 'react-final-form';
import { Form as AntForm, Typography, Button } from 'antd';

import { TextInputField } from 'shared/view/fields';

import styles from './Chat.module.scss';
import { ChatMessage } from '../ChatMessage/ChatMessage';

type ChatForm = {
  message: string;
};

const { Text } = Typography;

export const Chat = () => {
  const [isRollUp, setIsRollUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFormSubmit = (values: ChatForm) => console.info(values);

  const onHeaderClick = () => {
    setIsRollUp(state => !state);
  };

  const renderForm = ({ handleSubmit }: FormRenderProps<ChatForm>) => (
    <AntForm onFinish={handleSubmit}>
      <div
        className={cn(
          styles.Content,
          {
            [styles.SlideUp]: isRollUp,
            [styles.SlideDown]: !isRollUp,
          },
        )}
      >
        <ChatMessage>Content</ChatMessage>
        <ChatMessage>Content</ChatMessage>
        <ChatMessage>Content</ChatMessage>
        <ChatMessage>Content</ChatMessage>
        <ChatMessage>Content</ChatMessage>
        <ChatMessage>Content</ChatMessage>
        <ChatMessage>Content</ChatMessage>
        <ChatMessage>Content</ChatMessage>
        <ChatMessage>Content</ChatMessage>
        <ChatMessage>Content</ChatMessage>
        <ChatMessage>Content</ChatMessage>
        <ChatMessage>Content</ChatMessage>
        <ChatMessage>Content</ChatMessage>
        <ChatMessage>Content</ChatMessage>
        <ChatMessage>Content</ChatMessage>
        <ChatMessage>Content</ChatMessage>
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
    </AntForm>
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
