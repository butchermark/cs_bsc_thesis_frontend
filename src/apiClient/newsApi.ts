import { ApiClient } from './apiClient';
import { config } from '../config';

const apiClient = ApiClient.getInstance();

export const getNews = async (appId: number) => {
  const res = await apiClient.get(`${config.baseUrl}/news`, {
    appId: appId,
  });
  return res.data.appnews.newsitems;
};
