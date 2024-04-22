import { ConnectedFriendsPanel } from '../components/connectedFriends/ConnectedFriendsPanel';
import { FriendsPanel } from '../components/chat/FriendsPanel';
import { Navbar } from '../components/navbar/Navbar';
import { Box, ThemeProvider } from '@mui/material';
import { NewsPanel } from '../components/news/NewsPanel';
import { useThemeContext } from '../context/ThemeContext';

export const HomePage = () => {
  const { theme } = useThemeContext();

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
        }}
      >
        <Navbar />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: theme.palette.info.main,
            paddingTop: '84px',
            width: '100%',
            height: '100%',
            minHeight: '100vh',
          }}
        >
          <ConnectedFriendsPanel />
          <NewsPanel />
          <FriendsPanel />
        </Box>
      </Box>
    </ThemeProvider>
  );
};
