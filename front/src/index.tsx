import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "Store";
import App from "./App";
import { composeWithDevTools } from "redux-devtools-extension";
import axios from "axios";
import SERVER from "config/config.json";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const store = createStore(rootReducer, composeWithDevTools());

axios.defaults.baseURL = SERVER.SERVER;
axios.defaults.headers.common["Authorization"] = "";

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("AccessToken");
    if (!config.headers) {
      config.headers = {};
    }
    config.headers["Authorization"] = token ? token : "";

    return config;
  },
  (err) => {
    console.log(err);
    return Promise.reject(err);
  }
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
      retry: false,
      select: (data: any) => data?.data,
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={true} />
        <App />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
