import { ConnectedFriendsPanel } from '../components/ConnectedFriendsPanel';
import { FriendsPanel } from '../components/FriendsPanel';
import { Navbar } from '../components/Navbar';
import { Box } from '@mui/material';

export const HomePage = () => {
  return (
    <Box>
      <Navbar />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <ConnectedFriendsPanel />
        <FriendsPanel />
      </Box>
    </Box>
  );
};
