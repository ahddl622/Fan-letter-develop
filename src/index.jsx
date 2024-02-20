import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import GlobalStyle from "style/GlobalStyle";
import store from "./redux/config/configStroe";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <GlobalStyle />
    <App />
  </Provider>

  // </React.StrictMode>
);
