import { ConnectedFriendsCard } from './ConnectedFriendsCard';

export const ConnectedFriends = ({ friends }: any) => {
  return (
    <div>
      {friends.map((friend: any, index: number) => (
        <ConnectedFriendsCard key={index} friend={friend} />
      ))}
    </div>
  );
};
