import { Button, Typography } from '@mui/material';
import React, { useContext, useEffect } from 'react';
import {
  deleteAccountFriendListAndData,
  deleteUserAccount,
} from '../apiClient/steamApi';
import Context from '../context/Context';

export const AccountsPage = () => {
  const ctx = useContext(Context);

  useEffect(() => {}, [ctx.steamProfile, ctx.battlenetProfile]);
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
      default:
        break;
    }
  };
  return (
    <div>
      <React.Fragment>
        <div>
          <Typography>Steam Login</Typography>
          <Button
            disabled={Object.keys(ctx.steamProfile).length === 0}
            onClick={() => deleteAccount('steam')}
          >
            Remove Connection
          </Button>
          <Typography>BattleNet Login</Typography>
          <Button
            disabled={Object.keys(ctx.battlenetProfile).length === 0}
            onClick={() => deleteAccount('battlenet')}
          >
            Remove Connection
          </Button>
        </div>
      </React.Fragment>
    </div>
  );
};
