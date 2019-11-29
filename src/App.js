import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Layout from "shared/components/Layout/Layout";
import AppRouter from "./AppRouter";
import Navbar from "shared/components/Navbar/Navbar";
import { authSuccess, authError } from "store/actions/auth";
import classes from "./App.module.scss";
import { signInSuccess, autoLogin } from "store/sagas/auth";
import { loadItemLocalStorage } from "utilities/localStorage";
import axiosService from "services/api.service";

/* import axiosService from "services/api.service"; */

/* console.log("axiosService", axiosService); */

/* function useInitOnLoad() {
  const dispatch = useDispatch();

  axiosService.axios.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      if (error.response.status === 401) {
        dispatch(authError(error.response));
      }
    }
  );

  useEffect(() => {
    const acessToken = loadItemLocalStorage("acessToken");
    if (acessToken) {
      dispatch({ type: "DECODE_AND_SAVE", payload: { acessToken } });
    }
  }, []);
} */

function App() {
  return (
    <Layout>
      <Router>
        <Navbar />
        <div className={classes.contentContainer}>
          <AppRouter />
        </div>
      </Router>
    </Layout>
  );
}

export default App;
