import { useState } from 'react';
import { ConnectedFriendsCard } from './ConnectedFriendsCard';
import { Box, Button } from '@mui/material';
import { useThemeContext } from '../context/ThemeContext';

export const ConnectedFriends = ({ friends }: any) => {
  const [visibleFriends, setVisibleFriends] = useState(20); // Initially display 20 friends
  const { theme } = useThemeContext();

  const loadMoreFriends = () => {
    setVisibleFriends((prevVisibleFriends) => prevVisibleFriends + 20); // Load next 20 friends
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '10%',
      }}
    >
      {friends.slice(0, visibleFriends).map((friend: any, index: number) => (
        <ConnectedFriendsCard key={index} friend={friend} />
      ))}
      {friends.length > visibleFriends && (
        <Button
          sx={{
            width: '100%',
            height: '10%',
            minWidth: '100px',
            marginTop: '10px',
            fontSize: '10px',
            color: theme.palette.text.primary,
          }}
          onClick={loadMoreFriends}
        >
          Load More
        </Button>
      )}
    </Box>
  );
};
