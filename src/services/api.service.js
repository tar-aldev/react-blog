import axios from "axios";
import qs from "qs";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api",
});

axiosInstance.interceptors.request.use(config => {
  const token = localStorage.getItem("token");

  if (token) {
    return {
      ...config,
      headers: { ...config.headers, Authorization: `Bearer ${token}` },
    };
  }
  return config;
});
class AxiosService {
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
