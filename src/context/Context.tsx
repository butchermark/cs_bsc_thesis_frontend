import { createContext, useEffect, useState } from 'react';
import { IContextData } from '../interfaces/IContextData.interface';

const Context = createContext({} as IContextData);

export const ContextProvider = ({ children }: any) => {
  const [user, setUser] = useState(localStorage.getItem('user'));
  const [steamFriends, setSteamFriends] = useState([]);
  const [battleNetFriends, setBattleNetFriends] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [accessToken, setAccessToken] = useState<string | null>(
    localStorage.getItem('accessToken'),
  );
  const [refreshToken, setRefreshToken] = useState<string | null>(
    localStorage.getItem('refreshToken'),
  );
  const [email, setEmail] = useState<string>('');

  const [steamProfile, setSteamProfile] = useState<Object>({});
  const [battlenetProfile, setBattlenetProfile] = useState<Object>({});
  const [epicgamesProfile, setEpicgamesProfile] = useState<Object>({});
  const [searchedUsers, setSearchedUsers] = useState<any[]>([]);
  const [selectedFriendType, setSelectedFriendType] = useState<string>('');

  return (
    <Context.Provider
      value={{
        user,
        setUser,
        accessToken,
        refreshToken,
        setAccessToken,
        setRefreshToken,
        loading,
        setLoading,
        email,
        setEmail,
        steamProfile,
        setSteamProfile,
        steamFriends,
        battleNetFriends,
        setBattleNetFriends,
        setSteamFriends,
        battlenetProfile,
        setBattlenetProfile,
        epicgamesProfile,
        setEpicgamesProfile,
        searchedUsers,
        setSearchedUsers,
        selectedFriendType,
        setSelectedFriendType,
      }}
    >
      {children}
    </Context.Provider>
  );
};
export default Context;
