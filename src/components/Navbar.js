import React from "react";
import { FiSettings, FiShoppingCart } from "react-icons/fi";

function Navbar() {
  return (
    <div>
      <div className="navbar navbar-expand flex-column flex-md-row navbar-custom">
        <div className="container-fluid">
          {/* LOGO */}
          <a href="index.html" className="navbar-brand mr-0 mr-md-2 logo">
            <span className="logo-lg">
              <img src="/assets/images/logo.png" alt="" height={45} />
            </span>
            <span className="logo-sm">
              <img src="/assets/images/logo.png" alt="" height={45} />
            </span>
          </a>
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
            <li className="dropdown notification-list align-self-center profile-dropdown">
              <a
                className="nav-link dropdown-toggle nav-user mr-0"
                data-toggle="dropdown"
                href="https"
                role="button"
                aria-haspopup="false"
                aria-expanded="false"
              >
                <div className="media user-profile ">
                  <img src="assets/images/users/avatar-7.jpg" alt="userimage" className="rounded-circle align-self-center" />
                  <div className="media-body text-left">
                    <h6 className="pro-user-name ml-2 my-0">
                      <span>Shreyu N</span>
                      <span className="pro-user-desc text-muted d-block mt-1">Administrator </span>
                    </h6>
                  </div>
                  <span data-feather="chevron-down" className="ml-2 align-self-center" />
                </div>
              </a>
              <div className="dropdown-menu profile-dropdown-items dropdown-menu-right">
                <a href="pages-profile.html" className="dropdown-item notify-item">
                  <i data-feather="user" className="icon-dual icon-xs mr-2" />
                  <span>My Account</span>
                </a>
                <a href="https//" className="dropdown-item notify-item">
                  <i className="icon-dual icon-xs mr-2" />
                  <span>Settings</span>
                </a>
                <div className="dropdown-divider" />
                <a href="https//" className="dropdown-item notify-item">
                  <i data-feather="log-out" className="icon-dual icon-xs mr-2" />
                  <span>Logout</span>
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
