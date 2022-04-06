import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "Store";
import App from "./App";
import { composeWithDevTools } from "redux-devtools-extension";
import axios from "axios";
import SERVER from "config/config.json";

const store = createStore(rootReducer, composeWithDevTools());
const token = localStorage.getItem("AccessToken");

axios.defaults.baseURL = SERVER.SERVER;
if (token) axios.defaults.headers.common["Authorization"] = token;

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
