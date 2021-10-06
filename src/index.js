import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { HelmetProvider } from "react-helmet-async";
import ReduxThunk from "redux-thunk";
import rootReducers from "./reducers";
import { BrowserRouter as Router } from "react-router-dom";

const store = createStore(rootReducers, applyMiddleware(ReduxThunk));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </Router>
  </Provider>,
  document.getElementById("root")
);
