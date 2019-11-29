import axios from "axios";
import qs from "qs";
import { loadItemLocalStorage } from "utilities/localStorage";
import { AxiosService } from "./api.service";

/* const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api",
}); */

class AuthService extends AxiosService {
  signIn = credentials => {
    return this.post("auth/signin", credentials);
  };
  refreshToken = refreshToken => {
    return this.post("auth/token/refresh", { refreshToken });
  };
}

export default new AuthService();
