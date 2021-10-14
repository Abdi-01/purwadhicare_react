import React from "react";
import { FiShoppingCart, FiUser, FiLogOut } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/actions";

function Navbar() {
  const dispatch = useDispatch();
  const userGlobal = useSelector((state) => state.user);
  const { user } = userGlobal;

  return (
    <div>
      <div className="navbar navbar-expand flex-column flex-md-row navbar-custom">
        <div className="container-fluid">
          {/* LOGO */}
          <div className="navbar-brand mr-0 mr-md-2 logo">
            <Link to={user.role === "admin" ? "/dashboard" : "/"}>
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
            {user.role === "admin" ? null : (
              <>
                <li>
                  <Link to="/history">
                    <div className="nav-link right-bar-toggle">Transaksi</div>
                  </Link>
                </li>
                <li>
                  <Link to="/cart">
                    <div className="nav-link right-bar-toggle">
                      <FiShoppingCart />
                    </div>
                  </Link>
                </li>
                <li>
                  <Link to="/profile">
                    <div className="nav-link right-bar-toggle">
                      <FiUser />
                    </div>
                  </Link>
                </li>
              </>
            )}

            {user.iduser ? (
              <li>
                <div className="nav-link right-bar-toggle">
                  <Link to="/login" onClick={() => dispatch(logout())}>
                    <FiLogOut />
                  </Link>
                </div>
              </li>
            ) : null}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
