import { Avatar, Box, Button, Typography, useMediaQuery } from '@mui/material';
import steamLogo from '../../assets/Steam_icon_logo.svg.png';
import { useContext, useEffect } from 'react';
import Context from '../../context/Context';
import {
  checkAccountExistence,
  saveSteamUserFriendList,
  saveAccountData,
  getUserFriendListData,
} from '../../apiClient/steamApi';
import { config } from '../../config';
import { useThemeContext } from '../../context/ThemeContext';

export const SteamLoginButton = () => {
  const ctx = useContext(Context);
  const { theme } = useThemeContext();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));

  const loginUrlParams = {
    'openid.ns': 'http://specs.openid.net/auth/2.0',
    'openid.mode': 'checkid_setup',
    'openid.return_to': `${config.websiteUrl}/home`,
    'openid.realm': `${window.location.protocol}//${window.location.host}`,
    'openid.identity': 'http://specs.openid.net/auth/2.0/identifier_select',
    'openid.claimed_id': 'http://specs.openid.net/auth/2.0/identifier_select',
  };

  const steamLoginUrl =
    'https://steamcommunity.com/openid/login' +
    '?' +
    new URLSearchParams(loginUrlParams).toString();

  useEffect(() => {
    accountExistence('steam');
  }, []);

  const accountExistence = async (type: string) => {
    try {
      const existingAccount = await checkAccountExistence(type);
      if (existingAccount) {
        ctx.setSteamProfile(existingAccount);
        fetchSteamFriends(existingAccount.accountId);
      } else {
        fetchSteamFriends();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSteamFriends = async (steamId?: string) => {
    try {
      const urlSearchParams = new URLSearchParams(window.location.href);
      const claimedId = urlSearchParams.get('openid.claimed_id');
      if (steamId) {
        fetchingSteamFriends(steamId, false);
      } else {
        if (claimedId) {
          const steamIdMatch = claimedId.match(/\/(\d+)$/);

          if (steamIdMatch) {
            const steamId = steamIdMatch[1];
            fetchingSteamFriends(steamId, true);
          } else {
            throw new Error('SteamID not found in claimedId: ' + claimedId);
          }
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchingSteamFriends = async (steamId: string, isSavable: boolean) => {
    await saveSteamUserFriendList(steamId);
    if (isSavable) {
      const profile = await saveAccountData(steamId, 'steam');
      ctx.setSteamProfile(profile);
      window.location.reload();
    }
    const friendsData = await getUserFriendListData('steam');
    ctx.setSteamFriends(friendsData);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Button disabled={Object.keys(ctx.steamProfile).length > 0}>
        {Object.keys(ctx.steamProfile).length > 0 ? (
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
                src={steamLogo}
                alt="Steam Logo"
                sx={{ width: '50px', height: '50px' }}
              />
              <Avatar
                src={ctx.steamProfile.avatar}
                alt="User Avatar"
                sx={{
                  width: '25px',
                  height: '25px',
                  position: 'absolute',
                  borderRadius: '50%',
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
              {ctx.steamProfile.accountName}
            </Typography>{' '}
          </Box>
        ) : (
          <a href={steamLoginUrl}>
            <Avatar
              src={steamLogo}
              alt="Steam Logo"
              sx={{ width: '50px', height: '50px' }}
            />
          </a>
        )}
      </Button>
    </Box>
  );
};
