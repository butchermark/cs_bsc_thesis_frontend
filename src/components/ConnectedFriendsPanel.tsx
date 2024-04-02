import { Box, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import Context from '../context/Context';
import { ConnectedFriends } from './ConnectedFriends';
import { useThemeContext } from '../context/ThemeContext';
import { SwitchFriendsButton } from './SwitchFriendsButton';

export const ConnectedFriendsPanel = () => {
  const ctx = useContext(Context);
  const { theme } = useThemeContext();

  useEffect(() => {}, [ctx.selectedFriendType]);
  const filteredFriends = () => {
    switch (ctx.selectedFriendType) {
      case 'steam':
        return ctx.steamFriends;
      case 'battlenet':
        return ctx.battleNetFriends;
      case 'epicgames':
        return null;
      default:
        return [];
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.default,
        marginTop: '10px',
        borderTopRightRadius: '20px',
        borderBottomRightRadius: '20px',
        width: '100%',
        maxWidth: '200px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ marginLeft: '10px' }}>
        {Object.keys(ctx.steamProfile).length !== 0 && (
          <SwitchFriendsButton friendType="steam" buttonName="Steam" />
        )}
        {Object.keys(ctx.battlenetProfile).length !== 0 && (
          <SwitchFriendsButton friendType="battlenet" buttonName="Battle.net" />
        )}
        {Object.keys(ctx.epicgamesProfile).length !== 0 && (
          <SwitchFriendsButton friendType="epicgames" buttonName="Epic Games" />
        )}
      </Box>
      <Box sx={{ padding: '10px', height: '100%' }}>
        {filteredFriends().length > 0 ? (
          <ConnectedFriends friends={filteredFriends()} />
        ) : (
          <Typography sx={{ color: theme.palette.text.primary }}>
            No friends found for the selected type.
          </Typography>
        )}
      </Box>
    </Box>
  );
};
