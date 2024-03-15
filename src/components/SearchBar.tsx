import { Box, Input } from '@mui/material';
import { useEffect, useState } from 'react';
import { config } from '../config';
import { ApiClient } from '../apiClient/apiClient';
const apiClient = ApiClient.getInstance();

export const SearchBar = (params: any) => {
  const [textValue, setTextValue] = useState('');
  const userId = JSON.parse(localStorage.getItem('user')!).id;
  const [timerId, setTimerId] = useState<number | null>(null); // To store the timer id

  useEffect(() => {
    // Clear the timer when component unmounts or when userId changes
    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, [timerId, userId]);

  const timer = (value: any) => {
    if (timerId) {
      clearTimeout(timerId); // Reset the previous timer
    }
    const timeoutId = setTimeout(() => {
      fetchData();
    }, 240);
    setTimerId(timeoutId as any); // Store the new timer id
  };

  const fetchData = async () => {
    try {
      const response = await apiClient.get(`${config.baseUrl}/user/${userId}`);
      params.setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  return (
    <Box>
      <Input
        onChange={(e) => {
          setTextValue(e.target.value);
          timer(e.target.value);
        }}
      />
    </Box>
  );
};
