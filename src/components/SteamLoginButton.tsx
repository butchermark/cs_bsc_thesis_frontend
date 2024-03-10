import { Button } from '@mui/material';
import steamLogo from '../components/UI/logos/Steam_icon_logo.svg.png';
import { useContext, useEffect, useState } from 'react';
import Context from '../context/Context';
import {
  checkAccountExistence,
  deleteFriendList,
  saveSteamUserFriendList,
  saveAccountData,
  getSteamUserFriendData,
} from '../services/steam.service';
import '../components/UI/styles/steam-login-button.css';

export const SteamLoginButton = () => {
  const { setSteamProfile, steamProfile, setFriends } = useContext(Context);
  const [deleteFriends, setDeleteFriends] = useState(false);

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
        setSteamProfile(existingAccount);
        fetchSteamFriends(existingAccount.accountId);
        console.log('ASD');
      } else {
        fetchSteamFriends();
        console.log('bbb');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSteamFriends = async (steamId?: string) => {
    try {
      const urlSearchParams = new URLSearchParams(window.location.href);
      const claimedId = urlSearchParams.get('openid.claimed_id');
      if (deleteFriends) {
        deleteFriendList();
      }
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
      setSteamProfile(profile);
      window.location.reload();
    }
    const friendsData = await getSteamUserFriendData();
    setFriends(friendsData);
  };

  return (
    <>
      <Button disabled={Object.keys(steamProfile).length > 0}>
        {Object.keys(steamProfile).length > 0 ? (
          <div className="button-container">
            <img src={steamLogo} alt="Steam Logo" width="50" height="50" />
            <img
              src={steamProfile.avatar}
              alt="User Avatar"
              width="25"
              height="25"
            />
          </div>
        ) : (
          <a href={steamLoginUrl}>
            <img src={steamLogo} alt="Steam Logo" width="50" height="50" />
          </a>
        )}
      </Button>
    </>
  );
};
