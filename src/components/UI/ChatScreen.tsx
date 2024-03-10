import { useContext, useEffect } from 'react';
import Context from '../../context/Context';
import React from 'react';
import { messageApi } from '../../apiClient/messageApi';
import { IMessage } from '../../interfaces/IMessage.interface';
import ChatArea from './ChatArea';
import ChatInput from './ChatInput';

export default function ChatScreen(params: any) {
  const ctx = useContext(Context);
  const [messages, setMessages] = React.useState<any>(null);

  const retrieveMessages = async () => {
    return await messageApi.getMessages(params.userId);
  };

  useEffect(() => {
    retrieveMessages().then((res) => {
      setMessages(res.data);
    });
  }, []);

  return (
    <>
      <ChatArea messages={messages} />
      <ChatInput userId={params.userId} />
    </>
  );
}
