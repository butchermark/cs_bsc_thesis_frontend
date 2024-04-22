import { ApiClient } from './apiClient';
import { config } from '../config';
import { getUser } from '../services/user.service';
import { getUserFriendListData } from './steamApi';

const apiClient = ApiClient.getInstance();

export const getEpicGamesFriends = async (): Promise<any> => {
  const response = await getUserFriendListData('epicgames');
  return response;
};

export const saveEpicGamesAccount = async (
  type: string,
  authCode: string,
): Promise<any> => {
  const user = getUser();
  const response = await apiClient.get(
    `${config.baseUrl}/user/saveepicgamesaccountdata/${user.id}/${type}/${authCode}`,
  );
  return response;
};

export const saveEpicGamesUserFriendList = async (): Promise<any> => {
  const user = getUser();
  const response = await apiClient.get(
    `${config.baseUrl}/user/saveepicgamesfriendsdata/${user.id}/epicgames`,
  );
  console.log(response.data);
  return response.data;
};
