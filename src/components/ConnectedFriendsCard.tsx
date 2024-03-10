export const ConnectedFriendsCard = ({ friend }: any) => {
  const getStatusDescription = (status: number) => {
    switch (status) {
      case 0:
        return 'Offline';
      case 1:
        return 'Online';
      case 2:
        return 'Busy';
      case 3:
        return 'Away';
      case 4:
        return 'Snooze';
      case 5:
        return 'Looking to trade';
      case 6:
        return 'Looking to play';
      default:
        return 'Unknown';
    }
  };
  return (
    <div>
      <img src={friend.avatar} alt="Friend Avatar" />
      <p>{friend.name}</p>
      <p>{getStatusDescription(friend.status)}</p>
      <p>{friend.game}</p>
    </div>
  );
};
