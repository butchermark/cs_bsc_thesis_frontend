import { Avatar, Box, Button } from '@mui/material';
import battleNetLogo from '../components/UI/logos/battlenet-logo.png';
import { config } from '../config';
import Context from '../context/Context';
import { useContext, useEffect } from 'react';
import {
  checkAccountExistence,
  getUserFriendListData,
} from '../apiClient/steamApi';
import {
  saveBattleNetAccount,
  saveBattleNetUserFriendList,
} from '../apiClient/battlenetApi';
import { useNavigate } from 'react-router-dom';

export const BattleNetLoginButton = () => {
  const ctx = useContext(Context);
  let navigate = useNavigate();
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
      if (authCode) {
        fetchingBattleNetFriends(authCode);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchingBattleNetFriends = async (authCode?: string) => {
    if (authCode) {
      const profile = await saveBattleNetAccount('battlenet', authCode);
      await saveBattleNetUserFriendList();
      ctx.setBattlenetProfile(profile);
    } else {
      console.log('code is null');
    }
    navigate('/home');
    const friendsData = await getUserFriendListData('battlenet');
    ctx.setBattleNetFriends(friendsData);
  };

  return (
    <Box>
      <Button disabled={Object.keys(ctx.battlenetProfile).length > 0}>
        {Object.keys(ctx.battlenetProfile).length > 0 ? (
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
        ) : (
          <a href={battleNetLoginUrl}>
            <Avatar
              src={battleNetLogo}
              alt="Battle.net logo"
              sx={{ width: '50px', height: '50px' }}
            />
          </a>
        )}
      </Button>
      <Button onClick={async () => await saveBattleNetUserFriendList()}>
        Add friends
      </Button>
    </Box>
  );
};
