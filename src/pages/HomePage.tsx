import { useContext, useEffect } from 'react';
import { ConnectedFriends } from '../components/ConnectedFriends';
import { Navbar } from '../components/Navbar';
import Context from '../context/Context';
import { ApiClient } from '../apiClient/apiClient';
import { config } from '../config/';
import ChatScreen from '../components/UI/ChatScreen';
import React from 'react';
import { Button } from '@mui/material';
const apiClient = ApiClient.getInstance();

export const HomePage = () => {
  const { friends } = useContext(Context);
  const [users, setUsers] = React.useState<any[]>([]);
  const [selectedUserId, setSelectedUserId] = React.useState<number | null>(
    null,
  );

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await apiClient.get(config.baseUrl + '/user');
      setUsers(response.data);
      console.log('ASD');
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleChatting = (userId: number) => {
    if (selectedUserId === userId) {
      setSelectedUserId(null);
    }
    setSelectedUserId(userId);
  };

  return (
    <div>
      <Navbar />
      {users.map((user: any, index: number) => (
        <Button key={index} onClick={() => handleChatting(user.id)}>
          <p>{user.name}</p>
        </Button>
      ))}
      {selectedUserId !== null ? <ChatScreen userId={selectedUserId} /> : null}

      {friends.length > 0 ? <ConnectedFriends friends={friends} /> : null}
    </div>
  );
};
