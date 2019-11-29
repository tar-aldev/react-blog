import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Layout from "shared/components/Layout/Layout";
import AppRouter from "./AppRouter";
import Navbar from "shared/components/Navbar/Navbar";
import { authSuccess, authError } from "store/actions/auth";
import classes from "./App.module.scss";
import { signInSuccess, autoLogin } from "store/sagas/auth";
import {
  loadItemLocalStorage,
  removeItemLocalStorage,
} from "utilities/localStorage";
import axiosService from "services/api.service";
import { checkTokenExpired, decodeToken } from "utilities/auth";
import authService from "services/auth.service";

const useInitialAuth = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    const redirectToLogin = () => {
      history.push("/login");
    };

    axiosService.axios.interceptors.response.use(
      response => {
        return response;
      },
      error => {
        console.log("error.response", error.response);
        if (error.config.url.includes("token/refresh")) {
          console.log("error", error);
          return new Promise((resolve, reject) => {
            reject(error);
            // redirectToLogin()
          });
        }
        if (error.response.status === 401) {
          const failedRequestConfig = error.config;
          console.log("failed request 401");
          console.log(error.config);
          console.log("resfresh token");
          return tryRefreshToken(failedRequestConfig);
        }
      }
    );

    let accessToken = loadItemLocalStorage("accessToken");
    let refreshToken = loadItemLocalStorage("refreshToken");
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
        /* SET AUTH HEADER */
        if (failedRequestConfig) {
          // retry
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
        console.log("Error from try refresh token", error);
        removeItemLocalStorage("accessToken");
        removeItemLocalStorage("refreshToken");
        redirectToLogin();
      }
    }

    if (!accessToken || !refreshToken) {
      return redirectToLogin();
    }
    const tokenExpired = checkTokenExpired(decodeToken(accessToken));
    if (tokenExpired) {
      tryRefreshToken();
    }
  }, []);
};

function App() {
  useInitialAuth();

  return (
    <Layout>
      <Navbar />
      <div className={classes.contentContainer}>
        <AppRouter />
      </div>
    </Layout>
  );
}

export default App;
