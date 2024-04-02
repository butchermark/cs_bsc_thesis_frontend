import { ApiClient } from './apiClient';
import { config } from '../config';
import { getUser } from '../services/user.service';
import { getUserFriendListData } from './steamApi';

const apiClient = ApiClient.getInstance();

export const getBattleNetFriends = async (): Promise<any> => {
  const response = await getUserFriendListData('battlenet');
  return response;
};

export const saveBattleNetAccount = async (
  type: string,
  authCode: string,
): Promise<any> => {
  const user = getUser();
  const response = await apiClient.get(
    `${config.baseUrl}/user/savebattlenetaccountdata/${user.id}/${type}/${authCode}`,
  );
  return response;
};

export const saveBattleNetUserFriendList = async (): Promise<any> => {
  const user = getUser();
  const response = await apiClient.get(
    `${config.baseUrl}/user/savebattlenetfriendsdata/${user.id}/battlenet`,
  );
  return response.data;
};
