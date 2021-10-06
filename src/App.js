import "./App.css";
import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Verification from "./pages/Verification";
import ForgetPassword from "./pages/forgetPassword";
import ResetPassword from "./pages/resetPassword";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route component={Login} path="/login" />
          <Route component={Register} path="/register" />
          <Route component={ResetPassword} path="/reset-password/:token" />
          <Route component={ForgetPassword} path="/forget-password" />
          <Route component={Verification} path="/authentication/:token" />
          <Route component={Home} path="/" />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
