import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Layout from "shared/components/Layout/Layout";
import AppRouter from "./AppRouter";
import Navbar from "shared/components/Navbar/Navbar";
import { authSuccess } from "store/actions/auth";
import classes from "./App.module.scss";
import { signInSuccess, autoLogin } from "store/sagas/auth";

function useAutoLogin() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch({ type: "AUTO_LOGIN", payload: token });
    }
  }, []);
}

function App() {
  useAutoLogin();
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
