import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography } from '@mui/material';

export default function ChatArea({ params }: any) {
  const userId = JSON.parse(localStorage.getItem('user')!).id;
  const [messages, setMessages] = useState<any[]>(params.messages);

  useEffect(() => {
    setMessages(params.messages);
  }, [params.messages]);

  return (
    <Box>
      <Typography variant="h6">{params.userName}</Typography>
      <Box sx={{ overflowY: 'auto', maxHeight: '400px', marginBottom: '16px' }}>
        {messages.map((message, index) => (
          <Box
            key={message.id || index}
            sx={{
              width: '100%',
              textAlign: message.senderId === userId ? 'right' : 'left',
              marginBottom: '8px',
            }}
          >
            <Typography
              sx={{
                backgroundColor:
                  message.senderId === userId ? '#0084ff' : '#e5e5ea',
                color: message.senderId === userId ? 'white' : 'black',
                borderRadius: '20px',
                padding: '8px',
                maxWidth: '100%',
                display: 'inline-block',
              }}
            >
              {message.content}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
