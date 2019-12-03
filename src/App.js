import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Layout from "shared/components/Layout/Layout";
import Navbar from "shared/components/Navbar/Navbar";
import classes from "./App.module.scss";
import AppRouter from "./AppRouter";
import addTokenRefresher from "utilities/addTokenRefresher";

function App() {
  const [triedLogin, setTriedLogin] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  /* 
    Otherwise get inifinite loop 
    redirect will render the app => addTokenRefresher() => redirect ...
  */
  if (!triedLogin) {
    addTokenRefresher(history, dispatch, setTriedLogin);
  }

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
