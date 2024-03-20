import { Box, Button, Typography } from '@mui/material';
import { useContext, useState } from 'react';
import Context from '../context/Context';
import { ConnectedFriends } from './ConnectedFriends';
import { useThemeContext } from '../context/ThemeContext';

export const ConnectedFriendsPanel = () => {
  const ctx = useContext(Context);
  const { theme } = useThemeContext();
  const [selectedFriendType, setSelectedFriendType] = useState<string>('');

  const handleFriendTypeChange = (friendType: string) => {
    setSelectedFriendType(friendType);
  };

  const filteredFriends = selectedFriendType
    ? ctx.friends.filter(
        (friend: { friendType: string }) =>
          friend.friendType === selectedFriendType,
      )
    : ctx.friends;

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.default,
        marginTop: '10px',
        borderTopRightRadius: '20px',
        borderBottomRightRadius: '20px',
        width: '100%',
        maxWidth: '200px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box>
        {Object.keys(ctx.steamProfile).length !== 0 && (
          <Button onClick={() => handleFriendTypeChange('steam')}>Steam</Button>
        )}
        {Object.keys(ctx.battlenetProfile).length !== 0 && (
          <Button onClick={() => handleFriendTypeChange('battle.net')}>
            Battle.net
          </Button>
        )}
        {Object.keys(ctx.epicgamesProfile).length !== 0 && (
          <Button onClick={() => handleFriendTypeChange('epic games')}>
            Epic Games
          </Button>
        )}
      </Box>
      <Box>
        {filteredFriends.length > 0 ? (
          <ConnectedFriends friends={filteredFriends} />
        ) : (
          <Typography>No friends found for the selected type.</Typography>
        )}
      </Box>
    </Box>
  );
};
