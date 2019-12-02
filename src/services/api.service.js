import axios from "axios";
import qs from "qs";
import { loadItemLocalStorage } from "utilities/localStorage";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api",
});

axiosInstance.interceptors.request.use(config => {
  const accessToken = loadItemLocalStorage("accessToken");

  if (accessToken) {
    return {
      ...config,
      headers: { ...config.headers, Authorization: `Bearer ${accessToken}` },
    };
  }
  return config;
});
/* 
axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    console.log("error", error.response);
  }
); */

export class AxiosService {
  axios = axiosInstance;
  getData = (url, params) => {
    return axiosInstance.get(url, {
      params,
      paramsSerializer: params => {
        return qs.stringify(params);
      },
    });
  };
  post = (url, data) => {
    return axiosInstance.post(url, data);
  };
  put = (url, data) => {
    console.log({ url, data });
    return axiosInstance.put(url, data);
  };
}

export default new AxiosService();
