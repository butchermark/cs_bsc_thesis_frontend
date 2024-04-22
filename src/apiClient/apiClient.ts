import axios from 'axios';

export class ApiClient {
  private static instance: ApiClient;

  private readonly baseUrl = process.env.REACT_APP_API_BASE_URL;

  private constructor() {
    axios.defaults.baseURL = this.baseUrl;
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    axios.defaults.headers.common['Access-Control-Allow-Methods'] =
      'GET, POST, PUT, DELETE, PATCH, OPTIONS';
  }

  public static getInstance(): ApiClient {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient();
    }
    return ApiClient.instance;
  }

  private getBearerToken(): string {
    const accessToken = localStorage.getItem('accessToken') || '';
    return 'Bearer ' + accessToken;
  }

  private updateAccessToken(accessToken: string) {
    localStorage.setItem('accessToken', accessToken);
  }

  public async get(url: string, params?: any) {
    try {
      const bearerToken = this.getBearerToken();
      const config = { headers: { Authorization: bearerToken } };

      const response = await axios.get(url, { params, ...config });

      if (response.headers.authorization) {
        const newAccessToken = response.headers.authorization.split(' ')[1];
        this.updateAccessToken(newAccessToken);
      }

      return response;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }

  public async post(url: string, data: any) {
    try {
      const bearerToken = this.getBearerToken();
      const config = { headers: { Authorization: bearerToken } };

      const response = await axios.post(url, data, config);

      if (response.headers.authorization) {
        const newAccessToken = response.headers.authorization.split(' ')[1];
        this.updateAccessToken(newAccessToken);
      }

      return response;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }

  public async put(url: string, data?: any) {
    try {
      const bearerToken = this.getBearerToken();
      const config = { headers: { Authorization: bearerToken } };

      const response = await axios.put(url, data, config);

      if (response.headers.authorization) {
        const newAccessToken = response.headers.authorization.split(' ')[1];
        this.updateAccessToken(newAccessToken);
      }

      return response;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }

  public async delete(url: string, data?: any) {
    try {
      const bearerToken = this.getBearerToken();
      const config = { headers: { Authorization: bearerToken } };

      const response = await axios.delete(url, { data, ...config });

      if (response.headers.authorization) {
        const newAccessToken = response.headers.authorization.split(' ')[1];
        this.updateAccessToken(newAccessToken);
      }

      return response;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }

  public deleteWithParams(url: string, data: any) {
    try {
      return axios.delete(url, { data });
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }
}
