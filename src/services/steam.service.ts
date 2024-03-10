import { ApiClient } from '../apiClient/apiClient';
import { config } from '../config/';

export const SteamUserAuth = async (): Promise<void> => {
  const urlSearchParams = new URLSearchParams(window.location.href);
  const claimedId = urlSearchParams.get('openid.claimed_id');

  if (claimedId) {
    const steamIDMatch = claimedId.match(/\/(\d+)$/);

    if (steamIDMatch) {
      const steamID = steamIDMatch[1];
      console.log('SteamID:' + steamID);
    } else {
      throw new Error('SteamID not found in claimedId: ' + claimedId);
    }
  } else {
    //throw new Error('claimedId is null.');
    console.log('claimedId is null.');
  }
};

export const checkAccountExistence = async (type: string): Promise<any> => {
  const user = getUser();
  const isAccountExists = await ApiClient.getInstance().get(
    `${config.baseUrl}/user/checkforaccounts/${user.id}/${type}`,
  );
  return isAccountExists.data;
};

export const deleteUserAccount = async (type: string): Promise<void> => {
  const user = getUser();
  await ApiClient.getInstance().delete(
    `${config.baseUrl}/user/deleteuseraccount/${user.id}/${type}`,
  );
};

export const deleteAccountFriendListAndData = async (
  type: string,
): Promise<void> => {
  const user = getUser();
  await ApiClient.getInstance().delete(
    `${config.baseUrl}/user/deleteuserfriendlistanddata/${user.id}/${type}`,
  );
};

export const saveAccountData = async (
  accountId: string,
  type: string,
): Promise<any> => {
  const user = getUser();
  const response = await ApiClient.getInstance().get(
    `${config.baseUrl}/user/saveaccountdata/${accountId}/${user.id}/${type}`,
  );
  return response;
};

export const getAccountData = async (accountId: string): Promise<any> => {
  const user = getUser();
  const accountData = await ApiClient.getInstance().get(
    `${config.baseUrl}/user/getaccountdata/${accountId}/${user.id}`,
  );
  return accountData;
};

export const getAccountDataFromSteam = async (
  steamId: string,
): Promise<any> => {
  const accountData = await ApiClient.getInstance().get(
    `${config.baseUrl}/user/getaccountdatafromsteam/${steamId}`,
  );
  return accountData;
};

export const saveSteamUserFriendList = async (
  steamId: string,
): Promise<void> => {
  const user = getUser();
  await ApiClient.getInstance().get(
    `${config.baseUrl}/user/savefriendlist/${steamId}/${user.id}`,
  );
};

export const deleteFriendList = async (): Promise<void> => {
  await ApiClient.getInstance().delete(`${config.baseUrl}/user/friendlist/`);
};

export const getSteamUserFriendData = async (): Promise<any> => {
  const user = getUser();
  const response = await ApiClient.getInstance().get(
    `${config.baseUrl}/user/getfriendlistdata/${user.id}`,
  );
  const sortedFriends = sortByStatusAndGame(response.data);

  return sortedFriends;
};

function sortByStatusAndGame(array: any) {
  array.sort(
    (a: { game: any; status: number }, b: { game: any; status: number }) => {
      if (a.game && !b.game) {
        return -1;
      }
      if (b.game && !a.game) {
        return 1;
      }
      if (a.status === b.status) {
        return 0;
      }
      if (a.status === 0) {
        return 1;
      }
      if (b.status === 0) {
        return -1;
      }
      return a.status - b.status;
    },
  );
  const timestamp = 1707553187;
  const date = new Date(timestamp * 1000);

  console.log(date);
  return array;
}

function getUser() {
  const userString = localStorage.getItem('user');
  if (userString) {
    const user = JSON.parse(userString);
    return user;
  } else {
    throw new Error('User not found in localStorage');
  }
}
