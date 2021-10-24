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
import ProductList from "./pages/User/ProductList";
import ProductDetail from "./pages/User/ProductDetail";
import Dashboard from "./pages/Admin/Dashboard";
import NotFound from "./pages/NotFound";
import { useDispatch, useSelector } from "react-redux";
import OrderList from "./pages/User/OrderList";
import Recipe from "./pages/User/Recipe";
import ProductInventory from "./pages/Admin/ProductInventory";
import OrderRecipe from "./pages/Admin/OrderRecipe";
import OrderDetailRecipe from "./pages/Admin/OrderDetailRecipe";
import { getCartData } from "./redux/actions/cart";
import UserTransactions from "./pages/Admin/UserTransactions";

function App() {
  const dispatch = useDispatch();
  const userGlobal = useSelector((state) => state.user);
  const { user, storageIsChecked } = userGlobal;
  useEffect(() => {
    const tokenLocalStorage = localStorage.getItem("token");
    const userLocalStorage = localStorage.getItem("user_data");
    if (tokenLocalStorage) {
      dispatch(userKeepLogin(tokenLocalStorage));
      const userData = JSON.parse(userLocalStorage);
      dispatch(getCartData(userData.iduser));
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
          <Route component={OrderHistory} path="/order-history" />
          <Route component={ProductDetail} path="/productdetail/:idproduct" />
          <Route component={Recipe} path="/recipe" />
          <Route component={ProductList} path="/productlist" />

          <PrivateRoute path="/history">
            <OrderList />
          </PrivateRoute>

          <PrivateRoute path="/profile">
            <Profile />
          </PrivateRoute>
          {user.role === "admin" ? (
            <>
              <PrivateRoute path="/order-recipe/:idorder">
                <OrderDetailRecipe />
              </PrivateRoute>
              <Route component={ProductAdmin} path="/product-admin" />
              <PrivateRoute path="/dashboard">
                <Dashboard />
              </PrivateRoute>
              <PrivateRoute path="/product-inventory">
                <ProductInventory />
              </PrivateRoute>
              <PrivateRoute exact path="/order-recipe">
                <OrderRecipe />
              </PrivateRoute>
              <PrivateRoute exact path="/user-transactions">
                <UserTransactions />
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
