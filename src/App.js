/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { checkStorage, userKeepLogin } from "./redux/actions";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Verification from "./pages/User/Verification";
import ForgetPassword from "./pages/User/forgetPassword";
import ResetPassword from "./pages/User/resetPassword";
import Home from "./pages/User/Home";
import Profile from "./pages/User/Profile";
import FooterUser from "./components/FooterUser";
import Navbar from "./components/Navbar";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const userGlobal = useSelector((state) => state.user);
  useEffect(() => {
    const userLocalStorage = localStorage.getItem("user_data");
    if (userLocalStorage) {
      const userData = JSON.parse(userLocalStorage);
      dispatch(userKeepLogin(userData));
    } else {
      dispatch(checkStorage());
    }
  }, []);

  if (userGlobal.storageIsChecked) {
    return (
      <div id="wrapper">
        <Navbar />
        <Switch>
          <Route component={Login} path="/login" />
          <Route component={Register} path="/register" />
          <Route component={ResetPassword} path="/reset-password/:token" />
          <Route component={ForgetPassword} path="/forget-password" />
          <Route component={Verification} path="/authentication/:token" />
          <Route component={Profile} path="/profile" />
          <Route component={Home} path="/" />
        </Switch>
        <FooterUser />
      </div>
    );
  } else {
    return <h2>is Loading</h2>;
  }
}

export default App;
