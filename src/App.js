import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
// import Footer from "./components/Footer";
import FooterUser from "./components/FooterUser";
import Navbar from "./components/Navbar";
// import Sidebar from "./components/Sidebar";
import Home from "./pages/User/Home";
import Profile from "./pages/User/Profile";

function App() {
  return (
    <div id="wrapper">
      <BrowserRouter>
        <Navbar />
        {/* <Sidebar /> */}
        <Switch>
          <Route component={Profile} path="/profile/:id" />
          <Route component={Home} path="/" />
        </Switch>
      </BrowserRouter>
      {/* <Footer /> */}
      <FooterUser />
    </div>
  );
}

export default App;
