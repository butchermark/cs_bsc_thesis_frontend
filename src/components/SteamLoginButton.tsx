import { Box, Button } from '@mui/material';
import steamLogo from '../components/UI/logos/Steam_icon_logo.svg.png';
import { useContext, useEffect } from 'react';
import Context from '../context/Context';
import {
  checkAccountExistence,
  saveSteamUserFriendList,
  saveAccountData,
  getSteamUserFriendData,
} from '../apiClient/steamApi';
import '../components/UI/styles/steam-login-button.css';
import { useNavigate } from 'react-router-dom';

export const SteamLoginButton = () => {
  const ctx = useContext(Context);
  let navigate = useNavigate();

  const loginUrlParams = {
    'openid.ns': 'http://specs.openid.net/auth/2.0',
    'openid.mode': 'checkid_setup',
    'openid.return_to': 'http://localhost:3001/home',
    'openid.realm': window.location.protocol + '//' + window.location.host,
    'openid.identity': 'http://specs.openid.net/auth/2.0/identifier_select',
    'openid.claimed_id': 'http://specs.openid.net/auth/2.0/identifier_select',
  };

  const steamLoginUrl =
    'https://steamcommunity.com/openid/login' +
    '?' +
    new URLSearchParams(loginUrlParams).toString();

  useEffect(() => {
    accountExistence();
  }, []);

  const accountExistence = async () => {
    try {
      const existingAccount = await checkAccountExistence('steam');
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
        } else {
          console.log('claimedId is null.');
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchingSteamFriends = async (steamId: string, isSavable: boolean) => {
    if (isSavable) {
      await saveSteamUserFriendList(steamId);
      const profile = await saveAccountData(steamId, 'steam');
      ctx.setSteamProfile(profile);
      navigate('/home');
    }
    const friendsData = await getSteamUserFriendData();
    ctx.setFriends(friendsData);
  };

  return (
    <Box>
      <Button disabled={Object.keys(ctx.steamProfile).length > 0}>
        {Object.keys(ctx.steamProfile).length > 0 ? (
          <div className="button-container">
            <img src={steamLogo} alt="Steam Logo" width="50" height="50" />
            <img
              src={ctx.steamProfile.avatar}
              alt="User Avatar"
              width="25"
              height="25"
            />
          </div>
        ) : (
          <a href={steamLoginUrl} target="_blank">
            <img src={steamLogo} alt="Steam Logo" width="50" height="50" />
          </a>
        )}
      </Button>
    </Box>
  );
};
