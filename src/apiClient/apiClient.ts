import axios from "axios";

export class ApiClient {
  private static instance: ApiClient;

  private readonly baseUrl = process.env.REACT_APP_API_BASE_URL;

  private constructor() {
    axios.defaults.baseURL = this.baseUrl;
    axios.defaults.headers.post["Content-Type"] = "application/json";
    axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
    axios.defaults.headers.common["Access-Control-Allow-Methods"] =
      "GET, POST, PUT, DELETE, PATCH, OPTIONS";
  }

  public static getInstance(): ApiClient {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient();
    }
    return ApiClient.instance;
  }

  public get(url: string, params?: any, responseType?: any) {
    if (params) {
      return axios.get(url, { params });
    }
    if (responseType) {
      return axios.get(url, { params, responseType });
    }
    return axios.get(url);
  }

  public post(url: string, data: any, config?: any) {
    if (config) {
      return axios.post(url, data, config);
    }
    return axios.post(url, data);
  }

  public put(url: string, data?: any) {
    return axios.put(url, data);
  }

  public delete(url: string, data?: any) {
    return axios.delete(url, data);
  }

  public deleteWithParams(url: string, data: any) {
    return axios.delete(url, { data });
  }
}
