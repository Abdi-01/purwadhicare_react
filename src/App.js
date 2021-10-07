import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Login from "./pages/Login";
// import Home from "./pages/Home";
import Register from "./pages/Register";
import Verification from "./pages/Verification";
import ForgetPassword from "./pages/forgetPassword";
import ResetPassword from "./pages/resetPassword";
import Home from "./pages/User/Home";
import Profile from "./pages/User/Profile";
import FooterUser from "./components/FooterUser";
import Navbar from "./components/Navbar";
function App() {
  return (
    <div id="wrapper" className="App">
      <Switch>
        <Route component={Login} path="/login" />
        <Route component={Register} path="/register" />
        <Route component={ResetPassword} path="/reset-password/:token" />
        <Route component={ForgetPassword} path="/forget-password" />
        <Route component={Verification} path="/authentication/:token" />
        {/* <Route component={Home} path="/" /> */}
        <Route component={Profile} path="/profile/:id" />
        <Route component={Home} path="/" />
      </Switch>
    </div>
  );
}

export default App;
