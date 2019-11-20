import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Layout from "shared/components/Layout/Layout";
import AppRouter from "./AppRouter";
import Navbar from "shared/components/Navbar/Navbar";
import { authSuccess } from "store/actions/auth";

function useAutoLogin() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(authSuccess({ token }));
    }
  }, []);
}

function App() {
  useAutoLogin();
  return (
    <Layout>
      <Router>
        <Navbar />
        <div style={{ margin: "0 4% 0 16%", width: "calc(100vw - 18%)" }}>
          <AppRouter />
        </div>
      </Router>
    </Layout>
  );
}

export default App;
