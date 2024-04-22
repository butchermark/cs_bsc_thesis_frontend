import { Button, useMediaQuery } from '@mui/material';
import { useThemeContext } from '../../context/ThemeContext';
import { useContext } from 'react';
import Context from '../../context/Context';

export const SwitchFriendsButton = ({ friendType, buttonName }: any) => {
  const { theme } = useThemeContext();
  const ctx = useContext(Context);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Button
      sx={{
        height: '100%',
        '&:hover': {
          backgroundColor: theme.palette.info.main,
          color: theme.palette.mode === 'dark' ? '#000000' : '#ffffff',
          borderColor: theme.palette.info.main,
        },
        color: theme.palette.text.primary,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: theme.palette.info.main,
        borderRadius: '8px',
        textAlign: 'center',
        marginBottom: '5px',
        fontSize: isSmallScreen ? '6px' : '12px',
        paddingTop: 0,
        paddingBottom: 0,
        width: '50%',
      }}
      onClick={() => ctx.setSelectedFriendType(friendType)}
    >
      {buttonName}
    </Button>
  );
};
