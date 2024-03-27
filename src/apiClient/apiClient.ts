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

  public async get(url: string, params?: any, responseType?: any) {
    try {
      const response = await axios.get(url, { params, responseType });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  public async post(url: string, data: any, config?: any) {
    try {
      const response = await axios.post(url, data, config);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  public delete(url: string, data?: any) {
    try {
      const response = axios.delete(url, data);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  public deleteWithParams(url: string, data: any) {
    try {
      const response = axios.delete(url, { data });
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}
