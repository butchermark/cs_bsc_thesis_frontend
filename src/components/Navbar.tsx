import { Logout } from '@mui/icons-material';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import {
  AppBar,
  Toolbar,
  Tooltip,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  Switch,
  Box,
} from '@mui/material';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Context from '../context/Context';
import { SteamLoginButton } from './SteamLoginButton';
import { BattleNetLoginButton } from './BattleNetLoginButton';
import { useThemeContext } from '../context/ThemeContext';
import gamefeedrLogoBlack from './UI/logos/gamefeedr_logo_black.png';
import gamefeedrLogoWhite from './UI/logos/gamefeedr_logo_white.png';

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
    <Box sx={{ display: 'flex' }}>
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
            display: 'flex',
            justifyContent: 'space-between', // Align items at the start and end
            alignItems: 'center', // Center items vertically
            height: '85px',
          }}
        >
          <Avatar
            sx={{
              mr: 2,
              display: 'flex',
              maxWidth: 170,
              maxHeight: 75,
              width: '100%',
              height: '100%',
              borderRadius: '20%',
            }}
            src={
              theme.palette.mode === 'dark'
                ? gamefeedrLogoBlack
                : gamefeedrLogoWhite
            }
          />
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
