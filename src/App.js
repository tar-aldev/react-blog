import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Layout from "shared/components/Layout/Layout";
import Navbar from "shared/components/Navbar/Navbar";
import classes from "./App.module.scss";
import AppRouter from "./AppRouter";
import addTokenRefresher from "utilities/addTokenRefresher";
import { history } from "index";
import { Router } from "react-router-dom";

function App() {
  addTokenRefresher();
  return (
    <Router history={history}>
      <Layout>
        <Navbar />
        <div className={classes.contentContainer}>
          <AppRouter />
        </div>
      </Layout>
    </Router>
  );
}

export default App;
