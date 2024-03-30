import { Button, Typography } from '@mui/material';
import React, { useContext, useEffect } from 'react';
import {
  deleteAccountFriendListAndData,
  deleteUserAccount,
} from '../apiClient/steamApi';
import Context from '../context/Context';

export const AccountsPage = () => {
  const { setSteamProfile, steamProfile } = useContext(Context);

  useEffect(() => {}, [steamProfile]);
  const deleteAccount = async () => {
    await deleteUserAccount('steam');
    await deleteAccountFriendListAndData('steam');
    setSteamProfile({});
  };
  return (
    <div>
      <React.Fragment>
        <div>
          <Typography>Steam Login</Typography>
          <Button
            disabled={Object.keys(steamProfile).length === 0}
            onClick={deleteAccount}
          >
            Remove Connection
          </Button>
        </div>
      </React.Fragment>
    </div>
  );
};
