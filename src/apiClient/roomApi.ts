import { ApiClient } from './apiClient';
import { config } from '../config';

const apiClient = ApiClient.getInstance();

export const createRoom = async (paramsuserId: string, userId: string) => {
  return await apiClient.post(`${config.baseUrl}/room`, {
    users: [paramsuserId, userId],
  });
};
export const getRoom = async (paramsuserId: string, userId: string) => {
  return await apiClient.get(
    `${config.baseUrl}/room/${paramsuserId}/${userId}`,
  );
};
