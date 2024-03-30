import { ApiClient } from './apiClient';
import { config } from '../config';

const apiClient = ApiClient.getInstance();

export const deleteFriendList = async (): Promise<void> => {
  await apiClient.delete(`${config.baseUrl}/user/friendlist/`);
};

export const searchUsers = async (textValue: string, userId: string) => {
  try {
    const response = await apiClient.get(
      `${config.baseUrl}/user/search/${textValue}/${userId}`,
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};

export const fetchAllUsers = async (userId: string) => {
  try {
    const response = await apiClient.get(`${config.baseUrl}/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};
