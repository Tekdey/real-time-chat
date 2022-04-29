import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, compose, applyMiddleware } from "redux";
import DataRoomsReducer from "./reducers/chat.reducer";
import thunk from "redux-thunk";
import "./index.css";

const Store = createStore(DataRoomsReducer, compose(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={Store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
