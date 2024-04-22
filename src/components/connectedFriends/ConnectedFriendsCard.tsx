import { Avatar, Box, Typography, useMediaQuery } from '@mui/material';
import { useThemeContext } from '../../context/ThemeContext';

export const ConnectedFriendsCard = ({ friend }: any) => {
  const { theme } = useThemeContext();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const getStatusDescription = (status: number) => {
    switch (status) {
      case 0:
        return 'Offline';
      case 1:
        return 'Online';
      case 2:
        return 'Busy';
      case 3:
        return 'Away';
      case 4:
        return 'Snooze';
      case 5:
        return 'Looking to trade';
      case 6:
        return 'Looking to play';
      default:
        return 'Unknown';
    }
  };
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        padding: '10px',
        backgroundColor: '#1b2838',
        borderRadius: '5px',
        marginBottom: '10px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      }}
    >
      {friend.avatar ? (
        <Avatar
          sx={{
            minWidth: 50,
            minHeight: 50,
            width: '100%',
            height: '100%',
            marginRight: '15px',
          }}
          src={friend.avatar}
        />
      ) : (
        <Avatar
          sx={{
            minWidth: 50,
            minHeight: 50,
            width: '100%',
            height: '100%',
            marginRight: '15px',
          }}
        >
          {friend.name.charAt(0).toUpperCase()}
        </Avatar>
      )}
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography
          sx={{
            fontSize: isSmallScreen ? '10px' : '16px',
            color: friend.game
              ? 'green'
              : friend.status === 0
              ? 'gray'
              : '#66c0f4',
            marginBottom: '5px',
          }}
        >
          {friend.name}
        </Typography>
        <Typography
          sx={{
            fontSize: isSmallScreen ? '8px' : '12px',
            color: friend.game
              ? 'green'
              : friend.status === 0
              ? 'gray'
              : '#66c0f4',
          }}
        >
          {friend.game ? friend.game : getStatusDescription(friend.status)}
        </Typography>
      </Box>
    </Box>
  );
};
