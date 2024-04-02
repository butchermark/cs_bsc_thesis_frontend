import { ApiClient } from './apiClient';
import { config } from '../config';
import { getUser } from '../services/user.service';
import { sortByStatusAndGame } from '../services/steam.service';

const apiClient = ApiClient.getInstance();

export const saveSteamUserFriendList = async (
  steamId: string,
): Promise<void> => {
  const user = getUser();
  const response = await apiClient.get(
    `${config.baseUrl}/user/savefriendlist/${steamId}/${user.id}`,
  );

  return response.data;
};

export const getAccountDataFromSteam = async (
  steamId: string,
): Promise<any> => {
  const accountData = await apiClient.get(
    `${config.baseUrl}/user/getaccountdatafromsteam/${steamId}`,
  );
  return accountData;
};

export const getUserFriendListData = async (type: string): Promise<any> => {
  const user = getUser();
  const response = await apiClient.get(
    `${config.baseUrl}/user/getfriendlistdata/${user.id}/${type}`,
  );
  const sortedFriends = sortByStatusAndGame(response.data);
  return sortedFriends;
};

export const getAccountData = async (accountId: string): Promise<any> => {
  const user = getUser();
  const accountData = await apiClient.get(
    `${config.baseUrl}/user/getaccountdata/${accountId}/${user.id}`,
  );
  return accountData;
};

export const saveAccountData = async (
  accountId: string,
  type: string,
): Promise<any> => {
  const user = getUser();
  const response = await apiClient.get(
    `${config.baseUrl}/user/savesteamaccountdata/${accountId}/${user.id}/${type}`,
  );
  return response;
};

export const deleteAccountFriendListAndData = async (
  type: string,
): Promise<void> => {
  const user = getUser();
  await apiClient.delete(
    `${config.baseUrl}/user/deleteuserfriendlistanddata/${user.id}/${type}`,
  );
};

export const checkAccountExistence = async (type: string): Promise<any> => {
  const user = getUser();
  const isAccountExists = await apiClient.get(
    `${config.baseUrl}/user/checkforaccounts/${user.id}/${type}`,
  );
  return isAccountExists.data;
};

export const deleteUserAccount = async (type: string): Promise<void> => {
  const user = getUser();
  await apiClient.delete(
    `${config.baseUrl}/user/deleteuseraccount/${user.id}/${type}`,
  );
};
