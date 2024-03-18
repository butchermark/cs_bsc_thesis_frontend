import { Box, Input } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { config } from '../config';
import { ApiClient } from '../apiClient/apiClient';
import Context from '../context/Context';
const apiClient = ApiClient.getInstance();

export const SearchBar = () => {
  const ctx = useContext(Context);
  const userId = JSON.parse(localStorage.getItem('user')!).id;
  const [textValue, setTextValue] = useState('');
  const [timerId, setTimerId] = useState<number | null>(null);

  useEffect(() => {
    if (textValue !== '') {
      timer();
    } else {
      fetchAllUsers();
    }
  }, [userId, textValue]);

  const timer = () => {
    if (timerId) {
      clearTimeout(timerId);
    }
    const timeoutId = setTimeout(() => {
      fetchSearchUsers();
    }, 240);
    setTimerId(timeoutId as any);
  };

  const fetchSearchUsers = async () => {
    try {
      const response = await apiClient.get(
        `${config.baseUrl}/user/search/${textValue}/${userId}`,
      );
      ctx.setSearchedUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchAllUsers = async () => {
    try {
      const response = await apiClient.get(`${config.baseUrl}/user/${userId}`);
      ctx.setSearchedUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  return (
    <Box>
      <Input
        onChange={(e) => {
          setTextValue(e.target.value);
        }}
      />
    </Box>
  );
};
