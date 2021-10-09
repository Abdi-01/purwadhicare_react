import React, { useState } from "react";
import { logout } from "../../redux/actions";
import { Helmet } from "react-helmet-async";
import { useDispatch } from "react-redux";
const Home = () => {
  const dispatch = useDispatch();

  return (
    <div className="home">
      <Helmet>
        <title>Home | Purwadhicare</title>
      </Helmet>
      <h1>Ini Page Home</h1>
      <a href="/Login" onClick={() => dispatch(logout())} className="text-primary font-weight-bold ml-1">
        Logout
      </a>
    </div>
  );
};

export default Home;
