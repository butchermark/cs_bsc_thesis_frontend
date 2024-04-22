import { Avatar, Box, Button, Typography, useMediaQuery } from '@mui/material';
import battleNetLogo from '../../assets/battlenet-logo.png';
import { config } from '../../config';
import Context from '../../context/Context';
import { useContext, useEffect } from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {
  checkAccountExistence,
  getUserFriendListData,
} from '../../apiClient/steamApi';
import {
  saveBattleNetAccount,
  saveBattleNetUserFriendList,
} from '../../apiClient/battlenetApi';
import { useThemeContext } from '../../context/ThemeContext';

export const BattleNetLoginButton = () => {
  const ctx = useContext(Context);
  const { theme } = useThemeContext();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));
  const battleNetLoginUrl = `https://eu.battle.net/oauth/authorize?client_id=380ae6410bb942e1963f542472a2b29f&redirect_uri=${config.websiteUrl}/home&scope=wow.profile%20sc2.profile&state=login&response_type=code`;

  useEffect(() => {
    accountExistence('battlenet');
  }, []);

  const accountExistence = async (type: string) => {
    try {
      const existingAccount = await checkAccountExistence(type);
      if (existingAccount) {
        ctx.setBattlenetProfile(existingAccount);
        fetchingBattleNetFriends();
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
      if (authCode && state) {
        fetchingBattleNetFriends(authCode);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchingBattleNetFriends = async (authCode?: string) => {
    if (authCode) {
      await saveBattleNetUserFriendList();
      const profile = await saveBattleNetAccount('battlenet', authCode);
      ctx.setBattlenetProfile(profile);
      window.location.reload();
    }
    const friendsData = await getUserFriendListData('battlenet');
    ctx.setBattleNetFriends(friendsData);
  };

  const handleButtonClick = () => {
    window.location.href = battleNetLoginUrl;
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Button
        disabled={Object.keys(ctx.battlenetProfile).length > 0}
        onClick={() => handleButtonClick()}
      >
        {Object.keys(ctx.battlenetProfile).length > 0 ? (
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
                src={battleNetLogo}
                alt="Battle.net logo"
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
              {ctx.battlenetProfile.accountName}
            </Typography>{' '}
          </Box>
        ) : (
          <Avatar
            src={battleNetLogo}
            alt="Battle.net logo"
            sx={{ width: '50px', height: '50px' }}
          />
        )}
      </Button>
    </Box>
  );
};
