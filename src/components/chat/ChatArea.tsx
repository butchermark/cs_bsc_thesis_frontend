import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { useThemeContext } from '../../context/ThemeContext';

export default function ChatArea({ params }: any) {
  const { theme } = useThemeContext();

  const userId = JSON.parse(localStorage.getItem('user')!).id;
  const [messages, setMessages] = useState<any[]>(params.messages);
  const chatAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages(params.messages);
  }, [params.messages]);

  useLayoutEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <Box>
      <Box
        sx={{
          borderStyle: 'solid',
          borderWidth: '0 0 1px 0',
          borderColor: theme.palette.error.main,
        }}
      >
        <Typography sx={{ color: theme.palette.text.secondary }} variant="h6">
          {params.userName}
        </Typography>
      </Box>
      {messages !== undefined && (
        <Box
          ref={chatAreaRef}
          sx={{
            overflowY: 'auto',
            maxHeight: '400px',
            marginBottom: '16px',
            paddingRight: '8px',
            '::-webkit-scrollbar': {
              width: '8px',
            },
            '::-webkit-scrollbar-track': {
              background: theme.palette.error.main,
            },
            '::-webkit-scrollbar-thumb': {
              background: '#888',
              borderRadius: '4px',
            },
            '::-webkit-scrollbar-thumb:hover': {
              background: '#555',
            },
          }}
        >
          {messages.map((message) => (
            <Box
              key={message.id}
              sx={{
                width: '100%',
                textAlign: message.senderId === userId ? 'right' : 'left',
                wordWrap: 'break-word',
                paddingRight: '16px',
                boxSizing: 'border-box',
              }}
            >
              <Typography
                sx={{
                  backgroundColor:
                    message.senderId === userId
                      ? theme.palette.info.main
                      : '#0084ff',
                  color:
                    message.senderId === userId
                      ? theme.palette.primary.main
                      : 'white',
                  borderRadius: '20px',
                  padding: '8px',
                  marginTop: '5px',
                  maxWidth: 'calc(100% - 16px)',
                  display: 'inline-block',
                }}
              >
                {message.content}
              </Typography>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}
