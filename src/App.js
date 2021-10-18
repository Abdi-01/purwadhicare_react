/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { checkStorage, userKeepLogin } from "./redux/actions";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Verification from "./pages/User/Verification";
import ForgetPassword from "./pages/User/forgetPassword";
import ResetPassword from "./pages/User/resetPassword";
import Home from "./pages/User/Home";
import Profile from "./pages/User/Profile";
import Footer from "./components/Footer";
import FooterUser from "./components/FooterUser";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import ProductAdmin from "./pages/Admin/Product";
import Cart from "./pages/User/Cart";
import OrderHistory from "./pages/User/OrderHistory";
import ProductList from "./pages/User/ProductList"
import ProductDetail from "./pages/User/ProductDetail";
import Dashboard from "./pages/Admin/Dashboard";
import NotFound from "./pages/NotFound";
import { useDispatch, useSelector } from "react-redux";
import { getCartData } from "./redux/actions/cart"

function App() {
  const dispatch = useDispatch();
  const userGlobal = useSelector((state) => state.user);
  const { user, storageIsChecked } = userGlobal;
  useEffect(() => {
    const userLocalStorage = localStorage.getItem("user_data");
    console.log(userLocalStorage)
    if (userLocalStorage) {
      const userData = JSON.parse(userLocalStorage)
      dispatch(
        userKeepLogin(userData)
        // untuk ambil data cart saat ada user yang sudah login
             
        )
       dispatch(getCartData(userData.iduser))
    } else {
      dispatch(checkStorage());
    }
  }, []);

  const PrivateRoute = ({ children, ...rest }) => {
    return (
      <Route
        {...rest}
        render={() => {
          if (user.iduser) {
            return children;
          } else {
            return <Redirect to="/login" />;
          }
        }}
      />
    );
  };

  if (storageIsChecked) {
    return (
      <div id="wrapper">
        <Navbar />
        {user.role === "admin" ? <Sidebar /> : null}
        <Switch>
          <Route component={Login} path="/login" />
          <Route component={Register} path="/register" />
          <Route component={ResetPassword} path="/reset-password/:token" />
          <Route component={ForgetPassword} path="/forget-password" />
          <Route component={Verification} path="/authentication/:token" />
          <Route component={Cart} path="/cart" />
          <Route component={ProductList} path="/productlist" />
          {/* <Route component={OrderHistory} path="/history" /> */}
          <Route component={ProductDetail} path="/productdetail/:idproduct" />

          <PrivateRoute path="/history">
            <OrderHistory />
          </PrivateRoute>

          <PrivateRoute path="/profile">
            <Profile />
          </PrivateRoute>
          {user.role === "admin" ? (
            <>
              <Route component={ProductAdmin} path="/product-admin" />
              <PrivateRoute path="/dashboard">
                <Dashboard />
              </PrivateRoute>
            </>
          ) : null}
          <Route exact component={Home} path="/" />
          <Route component={NotFound} />
        </Switch>
        {user.role === "admin" ? <Footer /> : <FooterUser />}
      </div>
    );
  } else {
    return <h2>is Loading</h2>;
  }
}

export default App;
