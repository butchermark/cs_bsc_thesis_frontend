import { useState } from 'react';
import { Button, Input } from '@mui/material';
import { messageApi } from '../../apiClient/messageApi';

export default function ChatInput(params: any) {
  const [message, setMessage] = useState('');

  const sendChatMessage = async () => {
    if (
      params.userIdAndRoomId.userId === undefined ||
      message === '' ||
      message.trim().length === 0
    ) {
      return;
    }

    const request = {
      userId: params.userIdAndRoomId.userId,
      content: message,
      roomId: params.userIdAndRoomId.roomId,
    };

    await messageApi.addMessage(request);
    setMessage('');
  };

  return (
    <div>
      <Input onChange={(e) => setMessage(e.target.value)} value={message} />
      <Button onClick={sendChatMessage}>Send</Button>
    </div>
  );
}
