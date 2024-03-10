import React from 'react';
import Context from '../../context/Context';
import { AddMessageDto, IMessage } from '../../interfaces/IMessage.interface';
import { Button, Input } from '@mui/material';
import { messageApi } from '../../apiClient/messageApi';
import { useAddMessageForm } from '../../hooks/useAddMessageForm';

export default function ChatInput(userId: any) {
  const ctx = React.useContext(Context);
  const [message, setMessage] = React.useState('');

  const sendChatMessage = async () => {
    if (userId === undefined || message === '' || message.trim().length === 0) {
      return;
    }

    const request: AddMessageDto = {
      userId: userId,
      content: message,
    };

    await messageApi.addMessage(request);
  };

  return (
    <div>
      <Input onChange={(e) => setMessage(e.target.value)}></Input>
      <Button onClick={sendChatMessage}>Send</Button>
    </div>
  );
}
