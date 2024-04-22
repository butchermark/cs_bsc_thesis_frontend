import { Avatar, Box, Button, Typography } from '@mui/material';
import steamLogo from '../assets/Steam_icon_logo.svg.png';
import battleNetLogo from '../assets/battlenet-logo.png';
import epicGamesLogo from '../assets/epic_games_logo.png';
import { useContext } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  deleteAccountFriendListAndData,
  deleteUserAccount,
} from '../apiClient/steamApi';
import Context from '../context/Context';
import { useThemeContext } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';

export const AccountsPage = () => {
  const ctx = useContext(Context);
  const { theme } = useThemeContext();
  let navigate = useNavigate();

  const deleteAccount = async (type: string) => {
    await deleteUserAccount(type);
    await deleteAccountFriendListAndData(type);
    switch (type) {
      case 'steam':
        ctx.setSteamProfile({});
        break;
      case 'battlenet':
        ctx.setBattlenetProfile({});
        break;
      case 'epicgames':
        ctx.setEpicgamesProfile({});
        break;
      default:
        break;
    }
  };
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.palette.primary.main,
      }}
    >
      <ArrowBackIcon
        onClick={() => navigate('/home')}
        sx={{
          height: '50px',
          width: '50px',
          cursor: 'pointer',
          color: theme.palette.text.primary,
        }}
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '50%',
          height: '50%',
          alignItems: 'center',
          justifyContent: 'space-evenly',
          backgroundColor: theme.palette.primary.main,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <Avatar sx={{ width: 100, height: 100, mr: 2 }} src={steamLogo} />
          <Button
            sx={{
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
              fontWeight: 'bold',
              textAlign: 'center',
            }}
            disabled={Object.keys(ctx.steamProfile).length === 0}
            onClick={() => deleteAccount('steam')}
          >
            Remove Connection
          </Button>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <Avatar sx={{ width: 100, height: 100, mr: 2 }} src={battleNetLogo} />
          <Button
            sx={{
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
              fontWeight: 'bold',
              textAlign: 'center',
            }}
            disabled={Object.keys(ctx.battlenetProfile).length === 0}
            onClick={() => deleteAccount('battlenet')}
          >
            Remove Connection
          </Button>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <Avatar sx={{ width: 100, height: 100, mr: 2 }} src={epicGamesLogo} />
          <Button
            sx={{
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
              fontWeight: 'bold',
              textAlign: 'center',
            }}
            disabled={Object.keys(ctx.epicgamesProfile).length === 0}
            onClick={() => deleteAccount('epicgames')}
          >
            Remove Connection
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
