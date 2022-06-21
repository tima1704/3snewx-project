import React from "react";
import ReactDOM from "react-dom";

// eslint-disable-next-line react-hooks/exhaustive-deps

import "bootstrap/dist/css/bootstrap.min.css";
import "Styles/reset.css";
import "Styles/main.css";
import "react-loading-skeleton/dist/skeleton.css";

import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import Store from "Redux/Store";

import App from "./App";

ReactDOM.render(
  // <React.StrictMode>
  <Provider store={Store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
