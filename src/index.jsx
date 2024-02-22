import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import GlobalStyle from "style/GlobalStyle";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import getStore from "reduxStore/config/configStroe";

const store = getStore();
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <GlobalStyle />
    <App />
    <ToastContainer />
  </Provider>

  // </React.StrictMode>
);
