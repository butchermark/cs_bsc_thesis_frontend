import { Box, Button, Typography } from '@mui/material';
import { SearchBar } from './SearchBar';
import { useContext, useState } from 'react';
import ChatScreen from './ChatScreen';
import Context from '../../context/Context';
import { useThemeContext } from '../../context/ThemeContext';

export const FriendsPanel = () => {
  const { theme } = useThemeContext();
  const ctx = useContext(Context);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [selectedUserName, setSelectedUserName] = useState<string>('');

  const handleChatting = (userId: number, userName: string) => {
    if (selectedUserId === userId) {
      setSelectedUserId(null);
      setSelectedUserName('');
    }
    setSelectedUserId(userId);
    setSelectedUserName(userName);
  };

  return (
    <Box
      sx={{
        marginTop: '10px',
        backgroundColor: theme.palette.background.default,
        borderTopLeftRadius: '20px',
        borderBottomLeftRadius: '20px',
        width: '100%',
        maxWidth: '200px',
        height: '100%',
        minHeight: '50px',
        display: 'flex',
        flexDirection: 'column',
        paddingTop: '10px',
      }}
    >
      <SearchBar />
      {ctx.searchedUsers.map((user: any, index: number) => (
        <Button key={index} onClick={() => handleChatting(user.id, user.name)}>
          <Typography
            sx={{ fontSize: '16px', color: theme.palette.text.primary }}
          >
            {user.name}
          </Typography>
        </Button>
      ))}
      {selectedUserId !== null ? (
        <ChatScreen
          params={{ userId: selectedUserId, userName: selectedUserName }}
        />
      ) : null}
    </Box>
  );
};
