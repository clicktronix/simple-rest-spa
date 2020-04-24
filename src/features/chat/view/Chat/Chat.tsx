import React, { useState, useContext, useEffect } from 'react';
import cn from 'classnames';
import { Form, FormRenderProps } from 'react-final-form';
import { Button } from 'antd';
import { useMountedState } from 'react-use';

import { TextInputField } from 'shared/view/fields';
import { useApi } from 'shared/hooks/useApi';
import { AuthContext } from 'services/auth';
import { MessageResponse } from 'services/api/types/models/message';
import { Message } from 'shared/types/models';
import { useValidState } from 'shared/hooks/useValidState';

import styles from './Chat.module.scss';
import arrow from './img/arrow.png';
import { ChatMessage } from '../ChatMessage/ChatMessage';

type ChatForm = {
  message: string;
  isOpen?: boolean;
};

type ChatProps = {
  isHidden?: boolean;
};

export const Chat = ({ isHidden }: ChatProps) => {
  const api = useApi();
  const auth = useContext(AuthContext);
  const isMounted = useMountedState();
  const [isRollUp, setIsRollUp] = useState(isHidden || false);
  const [messages, setMessages] = useValidState<Message[]>(isMounted, []);

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
  }, [api.socket, setMessages]);

  const renderForm = ({ form, handleSubmit }: FormRenderProps<ChatForm>) => {
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      handleSubmit(event);
      form.reset();
    };

    return (
      <form onSubmit={onSubmit} autoComplete="off">
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
              <Button
                type="primary"
                htmlType="submit"
                className={styles.SendButton}
              >
                Send
              </Button>
            </div>
          )}
          <div className={styles.Messages}>
            {messages.map((x, i) => (
              <ChatMessage
                key={`${x.sender.email}_${i}`}
                message={x}
              />
            ))}
          </div>
        </div>
      </form>
    );
  };

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
