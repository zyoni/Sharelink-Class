import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css"; // Add this line

import { Provider } from "react-redux";
import { createReduxStore } from "./Redux/store.js";

ReactDOM.render(
  <Provider store={createReduxStore()}>
    <App />
  </Provider>,
  document.getElementById("root")
);
