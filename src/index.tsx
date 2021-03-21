import React from "react";
import ReactDOM from "react-dom";

import { makeServer } from "./mirage";
import { App } from "./App";

import "react-toastify/dist/ReactToastify.css";

makeServer();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
