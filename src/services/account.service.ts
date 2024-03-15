import { ApiClient } from '../apiClient/apiClient';
import { config } from '../config/';
import { getUser } from '../services/steam.service';

const apiClient = ApiClient.getInstance();

export const getUserAccountTypes = async (): Promise<any> => {
  const user = getUser();
  const accountTypes = await apiClient.get(
    `${config.baseUrl}/account/${user.id}`,
  );
  return accountTypes;
};
