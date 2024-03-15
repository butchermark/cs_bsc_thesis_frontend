import { useState } from 'react';
import { messageApi } from '../../apiClient/messageApi';
import { Input, Button, Grid, Box } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

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
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Input
        multiline
        disableUnderline
        rows={1}
        placeholder="Type a message..."
        onChange={(e) => setMessage(e.target.value)}
        value={message}
        sx={{
          width: '100%',
          borderRadius: '20px',
          padding: '10px',
          backgroundColor: '#f0f2f5',
        }}
      />
      <Button
        sx={{
          width: '50px',
          height: '50px',
          borderRadius: '50%',
        }}
        onClick={sendChatMessage}
      >
        <SendIcon sx={{ color: 'black', width: '60%', height: '60%' }} />
      </Button>
    </Box>
  );
}
