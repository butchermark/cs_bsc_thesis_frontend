import { createContext, useEffect, useState } from 'react';
import { IContextData } from '../interfaces/IContextData.interface';

const Context = createContext({} as IContextData);

export const ContextProvider = ({ children }: any) => {
  const [user, setUser] = useState(localStorage.getItem('user'));
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isSteamAccountExists, setIsSteamAccountExists] =
    useState<boolean>(false);
  const [accessToken, setAccessToken] = useState<string | null>(
    localStorage.getItem('accessToken'),
  );
  const [refreshToken, setRefreshToken] = useState<string | null>(
    localStorage.getItem('refresh'),
  );
  const [email, setEmail] = useState<string>('');
  const [steamProfile, setSteamProfile] = useState<Object>({});

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
        friends,
        setFriends,
        isSteamAccountExists,
        setIsSteamAccountExists,
      }}
    >
      {children}
    </Context.Provider>
  );
};
export default Context;