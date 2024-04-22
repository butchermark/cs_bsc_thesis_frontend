import { Box, Input } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import Context from '../../context/Context';
import { fetchAllUsers, searchUsers } from '../../apiClient/userApi';

export const SearchBar = () => {
  const ctx = useContext(Context);
  const userId = JSON.parse(localStorage.getItem('user')!).id;
  const [textValue, setTextValue] = useState('');
  const [timerId, setTimerId] = useState<number | null>(null);

  useEffect(() => {
    if (textValue !== '') {
      timer();
    } else {
      handleFetch();
    }
  }, [userId, textValue]);

  const timer = () => {
    if (timerId) {
      clearTimeout(timerId);
    }
    const timeoutId = setTimeout(async () => {
      const response = await searchUsers(textValue, userId);
      ctx.setSearchedUsers(response);
    }, 240);
    setTimerId(timeoutId as any);
  };

  const handleFetch = async () => {
    const response = await fetchAllUsers(userId);
    ctx.setSearchedUsers(response);
  };

  return (
    <Box>
      <Input
        sx={{
          width: '100%',
          maxWidth: '200px',
          fontSize: '16px',
          padding: '0 5px',
          borderBottom: '1px solid #ccc',
        }}
        disableUnderline
        placeholder="Search..."
        onChange={(e) => {
          setTextValue(e.target.value);
        }}
      />
    </Box>
  );
};
