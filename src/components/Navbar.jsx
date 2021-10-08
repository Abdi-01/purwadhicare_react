import React from "react";
import { FiShoppingCart, FiUser } from "react-icons/fi";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div>
      <div className="navbar navbar-expand flex-column flex-md-row navbar-custom">
        <div className="container-fluid">
          {/* LOGO */}
          <div className="navbar-brand mr-0 mr-md-2 logo">
            <Link to="/">
              <span className="logo-lg">
                <img src="/assets/images/logo.png" alt="" height={45} />
              </span>
              <span className="logo-sm">
                <img src="/assets/images/logo.png" alt="" height={45} />
              </span>
            </Link>
          </div>
          <ul className="navbar-nav bd-navbar-nav flex-row list-unstyled menu-left mb-0">
            <li>
              <button className="button-menu-mobile open-left disable-btn">
                <i data-feather="menu" className="menu-icon" />
                <i data-feather="x" className="close-icon" />
              </button>
            </li>
          </ul>
          <ul className="navbar-nav flex-row ml-auto d-flex list-unstyled topnav-menu float-right mb-0">
            <li className="dropdown notification-list" data-toggle="tooltip" data-placement="left" title="Settings">
              <a href="disable" className="nav-link right-bar-toggle">
                {/* <FiSettings /> */}
                <FiShoppingCart />
              </a>
            </li>
            <li className="dropdown notification-list" data-toggle="tooltip" data-placement="left" title="Settings">
              <Link to="/profile">
                <div className="nav-link right-bar-toggle">
                  <FiUser />
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
