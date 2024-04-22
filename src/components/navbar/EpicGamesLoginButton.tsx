import { Avatar, Box, Button, Typography, useMediaQuery } from '@mui/material';
import epicGamesLogo from '../../assets/epic_games_logo.png';
import { config } from '../../config';
import Context from '../../context/Context';
import { useContext, useEffect } from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {
  checkAccountExistence,
  getUserFriendListData,
} from '../../apiClient/steamApi';

import { useThemeContext } from '../../context/ThemeContext';
import {
  saveEpicGamesAccount,
  saveEpicGamesUserFriendList,
} from '../../apiClient/epicgamesApi';

export const EpicGamesLoginButton = () => {
  const ctx = useContext(Context);
  const { theme } = useThemeContext();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));
  const epicGamesLoginUrl = `https://www.epicgames.com/id/authorize?client_id=xyza7891Xar0YMfocbJPxUiRiQaUJatU&redirect_uri=${config.websiteUrl}/home&response_type=code&scope=basic_profile%20friends_list%20presence%20country`;

  useEffect(() => {
    accountExistence('epicgames');
    console.log(ctx.epicgamesProfile);
  }, []);

  const accountExistence = async (type: string) => {
    try {
      const existingAccount = await checkAccountExistence(type);
      if (existingAccount) {
        ctx.setEpicgamesProfile(existingAccount);
        fetchingEpicgamesFriends();
      } else {
        fetchAccount();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAccount = async () => {
    try {
      const urlSearchParams = new URLSearchParams(window.location.search);
      const authCode = urlSearchParams.get('code');
      const state = urlSearchParams.get('state');
      if (authCode && !state) {
        fetchingEpicgamesFriends(authCode);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchingEpicgamesFriends = async (authCode?: string) => {
    if (authCode) {
      await saveEpicGamesUserFriendList();
      const profile = await saveEpicGamesAccount('epicgames', authCode);
      ctx.setEpicgamesProfile(profile.data);
      window.location.reload();
    }
    const friendsData = await getUserFriendListData('epicgames');
    ctx.setEpicgamesFriends(friendsData);
  };

  const handleButtonClick = () => {
    window.location.href = epicGamesLoginUrl;
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Button
        disabled={Object.keys(ctx.epicgamesProfile).length > 0}
        onClick={() => handleButtonClick()}
      >
        {Object.keys(ctx.epicgamesProfile).length > 0 ? (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <Box
              sx={{
                position: 'relative',
                width: 50,
                height: 50,
                borderRadius: 50,
                display: 'flex',
                justifyContent: 'left',
                alignItems: 'flex-end',
              }}
            >
              <Avatar
                src={epicGamesLogo}
                alt="Epic Games logo"
                sx={{ width: '50px', height: '50px' }}
              />
              <CheckCircleIcon
                sx={{
                  width: '25px',
                  height: '25px',
                  position: 'absolute',
                  borderRadius: '50%',
                  backgroundColor: 'white',
                  color: 'green',
                }}
              />
            </Box>
            <Typography
              style={{
                fontFamily: 'Arial, sans-serif',
                fontSize: isSmallScreen
                  ? '0.4rem'
                  : isMediumScreen
                  ? '0.5rem'
                  : '0.6rem',
                fontWeight: 'bold',
                color: theme.palette.info.main,
              }}
            >
              {ctx.epicgamesProfile.accountName}
            </Typography>{' '}
          </Box>
        ) : (
          <Avatar
            src={epicGamesLogo}
            alt="Epic Games logo"
            sx={{ width: '50px', height: '50px' }}
          />
        )}
      </Button>
    </Box>
  );
};
