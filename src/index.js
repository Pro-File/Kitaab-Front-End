import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import App from "./App";
import History from "./components/History/History";
import store from "./redux/store";
import Layout from "./components/Layout/Layout";

ReactDOM.render(
  <Router history={History}>
    <Layout>
      <Provider store={store}>
        <App />
      </Provider>
    </Layout>
  </Router>,
  document.getElementById("root")
);
