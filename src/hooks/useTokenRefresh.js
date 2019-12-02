/**
|----------------------------------------------------------
| Used to refresh token on 401 error or on initial app load
|----------------------------------------------------------
*/

import { useEffect } from "react";
import axiosService from "services/api.service";
import authService from "services/auth.service";
import {
  loadItemLocalStorage,
  removeItemLocalStorage,
} from "utilities/localStorage";
import { checkTokenExpired, decodeToken } from "utilities/auth";

const useTokenRefresh = (history, dispatch) => {
  useEffect(() => {
    let accessToken = loadItemLocalStorage("accessToken");
    let refreshToken = loadItemLocalStorage("refreshToken");

    initAxios401Interceptor(redirectToLogin, tryRefreshToken);
    checkTokenOnAppLoad(
      accessToken,
      refreshToken,
      redirectToLogin,
      tryRefreshToken
    );

    function redirectToLogin() {
      history.push("/login");
    }

    async function tryRefreshToken(failedRequestConfig) {
      try {
        const {
          data: { accessToken: newAccessToken, refreshToken: newRefreshToken },
        } = await authService.refreshToken(refreshToken);
        refreshToken = newRefreshToken;
        dispatch({
          type: "DECODE_AND_SAVE_TOKENS",
          payload: {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
          },
        });

        if (failedRequestConfig) {
          /* set new access token as header */
          failedRequestConfig.headers[
            "Authorization"
          ] = `Bearer ${newAccessToken}`;

          return new Promise((resolve, reject) => {
            axiosService.axios
              .request(failedRequestConfig)
              .then(response => {
                resolve(response);
              })
              .catch(error => {
                reject(error);
              });
          });
        }
      } catch (error) {
        removeItemLocalStorage("accessToken");
        removeItemLocalStorage("refreshToken");
        redirectToLogin();
      }
    }
  }, [dispatch, history]);
};

export default useTokenRefresh;

function initAxios401Interceptor(redirectToLogin, tryRefreshToken) {
  axiosService.axios.interceptors.response.use(
    /* pass success response down the chain */
    response => {
      return response;
    },
    error => {
      /* It means we have already tried to refresh token and it gave us 401 error again */
      if (error.config.url.includes("token/refresh")) {
        return new Promise((resolve, reject) => {
          reject(error);
          redirectToLogin();
        });
      }
      if (error.response.status === 401) {
        const failedRequestConfig = error.config;
        return tryRefreshToken(failedRequestConfig);
      }
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
  );
}

function checkTokenOnAppLoad(
  accessToken,
  refreshToken,
  redirectToLogin,
  tryRefreshToken
) {
  if (!accessToken || !refreshToken) {
    return redirectToLogin();
  }
  const tokenExpired = checkTokenExpired(decodeToken(accessToken));
  if (tokenExpired) {
    tryRefreshToken();
  }
}
