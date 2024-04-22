import { useContext, useEffect } from 'react';
import Context from '../../context/Context';
import React from 'react';
import ChatArea from './ChatArea';
import ChatInput from './ChatInput';
import { socketService } from '../../services/socket.service';
import { Box } from '@mui/material';
import { useThemeContext } from '../../context/ThemeContext';
import Draggable from 'react-draggable';
import { createRoom, getRoom } from '../../apiClient/roomApi';

export default function ChatScreen({ params }: any) {
  const { theme } = useThemeContext();
  const ctx = useContext(Context);
  const userId = JSON.parse(localStorage.getItem('user')!).id;
  const [roomId, setRoomId] = React.useState<string>('');
  const [messages, setMessages] = React.useState<any[]>([]);

  useEffect(() => {
    /*
    if (params.userId !== null) {
      socketService.leaveRoom(roomId);
      socketService.disconnect();
    } else {
      fetchData();
    }
    */
    socketService.leaveRoom(roomId);
    fetchData();
  }, [params.userId]);

  const fetchData = async () => {
    try {
      const res = await fetchAndCreateRoom();

      if (res && res.data.id) {
        setRoomId(res.data.id);
        socketService.connectWithAuthToken(ctx.refreshToken);
        socketService.joinRoom(res.data.id);
        socketService.subscribeToMessages((data: any) => {
          setMessages((prev: any) => {
            return [...prev, data];
          });
        });
        setMessages(res.data.messages);
      }
    } catch (error) {
      console.error('Error fetching or creating room:', error);
    }
  };

  const fetchAndCreateRoom = async () => {
    try {
      let res = await getRoom(params.userId, userId);
      if (!res.data.id) {
        res = await createRoom(params.userId, userId);
      }
      return res;
    } catch (error) {
      throw error;
    }
  };

  return (
    <Draggable handle=".handle">
      <Box
        sx={{
          width: '100%',
          maxWidth: '400px',
          position: 'fixed', // Change position to fixed
          bottom: '0', // Stick to the bottom
          right: '0', // Stick to the right
          backgroundColor:
            theme.palette.mode === 'dark'
              ? theme.palette.success.main
              : theme.palette.text.secondary,
          borderWidth: '3px  0 0 3px',
          borderStyle: 'solid',
          borderColor: theme.palette.info.main,
          borderRadius: '20px 0 0 0',
          padding: '10px',
        }}
      >
        <ChatArea params={{ messages: messages, userName: params.userName }} />
        <ChatInput userIdAndRoomId={{ userId, roomId }} />
      </Box>
    </Draggable>
  );
}
