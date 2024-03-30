import { Box, Button, Typography, useMediaQuery } from '@mui/material';
import { useContext, useState } from 'react';
import Context from '../context/Context';
import { ConnectedFriends } from './ConnectedFriends';
import { useThemeContext } from '../context/ThemeContext';

export const ConnectedFriendsPanel = () => {
  const ctx = useContext(Context);
  const { theme } = useThemeContext();
  const [selectedFriendType, setSelectedFriendType] = useState<string>('');
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

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
          <Button
            sx={{
              height: '100%',
              '&:hover': {
                backgroundColor: theme.palette.info.main,
                color: theme.palette.mode === 'dark' ? '#000000' : '#ffffff',
                borderColor: theme.palette.info.main,
              },
              color: theme.palette.text.primary,
              borderStyle: 'solid',
              borderWidth: 1,
              borderColor: theme.palette.info.main,
              borderRadius: '8px',
              marginBottom: 1,
              marginTop: 1,
              textAlign: 'center',
              fontSize: isSmallScreen ? '6px' : '12px',
            }}
            onClick={() => handleFriendTypeChange('steam')}
          >
            Steam
          </Button>
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
      <Box sx={{ padding: '10px', height: '100%' }}>
        {filteredFriends.length > 0 ? (
          <ConnectedFriends friends={filteredFriends} />
        ) : (
          <Typography sx={{ color: theme.palette.text.primary }}>
            No friends found for the selected type.
          </Typography>
        )}
      </Box>
    </Box>
  );
};
