import { useState } from 'react';
import { messageApi } from '../../apiClient/messageApi';
import { Input, Button, Grid, Box } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useThemeContext } from '../../context/ThemeContext';

export default function ChatInput(params: any) {
  const { theme } = useThemeContext();
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
          flex: 1, // Adjusted to allow the input to take available space
          maxWidth: 'calc(100% - 60px)', // Adjusted to prevent overflowing
          borderRadius: '20px',
          padding: '10px',
          backgroundColor: theme.palette.error.main,
          color: theme.palette.text.secondary,
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
        <SendIcon
          sx={{
            color: theme.palette.text.secondary,
            width: '60%',
            height: '60%',
          }}
        />
      </Button>
    </Box>
  );
}
