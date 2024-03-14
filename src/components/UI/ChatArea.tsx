import { useEffect, useState } from 'react';
import { IMessage } from '../../interfaces/IMessage.interface';
import { Box, Typography } from '@mui/material';

export default function ChatArea(params: any) {
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    setMessages(params.messages);
  }, [params.messages]);

  return (
    <Box>
      <Typography>Chat Area</Typography>
      {messages && messages.length > 0
        ? messages.map((message: IMessage, index: number) => (
            <Box key={index}>
              <Typography>{message.content}</Typography>
            </Box>
          ))
        : null}
    </Box>
  );
}
