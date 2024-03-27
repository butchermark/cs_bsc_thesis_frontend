import { Logout } from '@mui/icons-material';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import {
  AppBar,
  Toolbar,
  Typography,
  Tooltip,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  Switch,
  Box,
} from '@mui/material';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Context from '../context/Context';
import { SteamLoginButton } from './SteamLoginButton';
import { BattleNetLoginButton } from './BattleNetLoginButton';
import { useThemeContext } from '../context/ThemeContext';

export const Navbar = () => {
  const { toggleTheme, theme } = useThemeContext();
  const { setAccessToken, setRefreshToken } = useContext(Context);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  let navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    setAccessToken(null);
    setRefreshToken(null);
    handleClose();
    navigate('/login');
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    handleClose();
  };

  return (
    <Box>
      <AppBar
        sx={{
          display: 'flex',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
        }}
        position="static"
      >
        <Toolbar
          sx={{
            backgroundColor: theme.palette.background.default,
          }}
        >
          <Typography
            paddingLeft={2}
            variant="h4"
            component="div"
            fontWeight={500}
            sx={{ flexGrow: 1 }}
          >
            Gamefeedr
          </Typography>
          <BattleNetLoginButton />
          <SteamLoginButton />
          <Switch onChange={toggleTheme} color="secondary" />
          <Tooltip title="Account">
            <IconButton
              onClick={handleClick}
              size="medium"
              sx={{ ml: 2 }}
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
              <Avatar
                sx={{
                  backgroundColor: '#0e055f',
                  border: 2,
                  width: 45,
                  height: 45,
                }}
              ></Avatar>
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={() => handleNavigation('/accounts')}>
              <ListItemIcon>
                <ManageAccountsIcon fontSize="medium" />
              </ListItemIcon>
              Accounts
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <Logout fontSize="medium" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
