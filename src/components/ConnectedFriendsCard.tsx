import { Avatar, Box, Typography } from '@mui/material';

export const ConnectedFriendsCard = ({ friend }: any) => {
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
      }}
    >
      <Avatar sx={{ width: 30, height: 30 }} src={friend.avatar} />
      <Box sx={{ display: 'flex', flexDirection: 'column', ml: 1 }}>
        <Typography
          sx={{
            fontSize: 12,
            color: friend.game
              ? 'green'
              : friend.status === 0
              ? 'gray'
              : 'blue',
          }}
        >
          {friend.name}
        </Typography>
        <Typography
          sx={{
            fontSize: 12,
            color: friend.game
              ? 'green'
              : friend.status === 0
              ? 'gray'
              : 'blue',
          }}
        >
          {friend.game ? friend.game : getStatusDescription(friend.status)}
        </Typography>
      </Box>
    </Box>
  );
};
