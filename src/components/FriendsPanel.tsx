import { Box, Button, Typography } from '@mui/material';
import { SearchBar } from './SearchBar';
import { useContext, useState } from 'react';
import ChatScreen from './UI/ChatScreen';
import Context from '../context/Context';

export const FriendsPanel = () => {
  const ctx = useContext(Context);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const handleChatting = (userId: number) => {
    if (selectedUserId === userId) {
      setSelectedUserId(null);
    }
    setSelectedUserId(userId);
  };

  return (
    <Box>
      <SearchBar />
      {ctx.searchedUsers.map((user: any, index: number) => (
        <Button key={index} onClick={() => handleChatting(user.id)}>
          <Typography>{user.name}</Typography>
        </Button>
      ))}
      {selectedUserId !== null ? <ChatScreen userId={selectedUserId} /> : null}
    </Box>
  );
};
