import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import ProductCard from "./components/ProductCard";

import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Admin from "./pages/Admin";
import Cart from "./pages/Cart";
import History from "./pages/History";
import ProductDetail from "./pages/ProductDetail";
import MyNavbar from "./components/MyNavbar";
import PersonalData from "./pages/PersonalData";

// set up redux
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import rootReducer from "../src/Redux/reducers";

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        {/* navbar diluar switch agar dapat muncul di tiap pages */}
        <MyNavbar />
        <Switch>
          <Route component={Login} path="/login" />
          <Route component={Register} path="/register" />
          <Route component={Admin} path="/admin" />
          <Route component={Cart} path="/cart" />
          <Route component={History} path="/history" />
          {/* agar product detail sesuai dengan id product (dynamic route) */}
          <Route component={ProductDetail} path="/productdetail/:productId" />
          <Route component={PersonalData} path="/personaldata" />
          <Route component={Home} path="/" />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
