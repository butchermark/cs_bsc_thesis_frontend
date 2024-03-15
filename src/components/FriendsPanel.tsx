import { Box, Button } from '@mui/material';
import { SearchBar } from './SearchBar';
import { useEffect, useState } from 'react';
import ChatScreen from './UI/ChatScreen';
import { ApiClient } from '../apiClient/apiClient';
import { config } from '../config';
const apiClient = ApiClient.getInstance();

export const FriendsPanel = () => {
  const [users, setUsers] = useState<any[]>([]);
  const userId = JSON.parse(localStorage.getItem('user')!).id;
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const handleChatting = (userId: number) => {
    if (selectedUserId === userId) {
      setSelectedUserId(null);
    }
    setSelectedUserId(userId);
  };

  const fetchData = async () => {
    try {
      const response = await apiClient.get(`${config.baseUrl}/user/${userId}`);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
  return (
    <Box>
      <SearchBar params={setUsers} />
      {users.map((user: any, index: number) => (
        <Button key={index} onClick={() => handleChatting(user.id)}>
          <p>{user.name}</p>
        </Button>
      ))}
      {selectedUserId !== null ? <ChatScreen userId={selectedUserId} /> : null}
    </Box>
  );
};
