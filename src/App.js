import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Layout from "shared/components/Layout/Layout";
import Navbar from "shared/components/Navbar/Navbar";
import classes from "./App.module.scss";
import AppRouter from "./AppRouter";
import useTokenRefresh from "hooks/useTokenRefresh";

function App() {
  const history = useHistory();
  const dispatch = useDispatch();

  useTokenRefresh(history, dispatch);
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
