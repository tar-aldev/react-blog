import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Layout from "shared/components/Layout/Layout";
import AppRouter from "./AppRouter";
import Navbar from "shared/components/Navbar/Navbar";

function App() {
  return (
    <Layout>
      <Router>
        <Navbar />
        <AppRouter />
      </Router>
    </Layout>
  );
}

export default App;
