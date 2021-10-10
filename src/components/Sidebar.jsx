import React from "react";
import { Link } from "react-router-dom";
import { FiHome, FiPackage } from "react-icons/fi";

function Sidebar() {
  return (
    <div>
      <div className="left-side-menu">
        <div className="media user-profile mt-2 mb-2">
          <img src="assets/images/users/avatar-7.jpg" className="avatar-sm rounded-circle mr-2" alt="Shreyu" />
          <img src="assets/images/users/avatar-7.jpg" className="avatar-xs rounded-circle mr-2" alt="Shreyu" />
          <div className="media-body">
            <h6 className="pro-user-name mt-0 mb-0">Nik Patel</h6>
            <span className="pro-user-desc">Administrator</span>
          </div>
        </div>
        <div className="sidebar-content">
          {/*- Sidemenu */}
          <div id="sidebar-menu" className="slimscroll-menu">
            <ul className="metismenu" id="menu-bar">
              <li className="menu-title">Navigation</li>
              <li>
                <Link to="/dashboard">
                  <FiHome />
                  <span className="badge badge-success float-right">1</span>
                  <span> Dashboard </span>
                </Link>
              </li>
              <li>
                <Link to="/product-admin">
                  <FiPackage />
                  <span> Product </span>
                </Link>
              </li>
            </ul>
          </div>
          {/* End Sidebar */}
          <div className="clearfix" />
        </div>
        {/* Sidebar -left */}
      </div>
    </div>
  );
}

export default Sidebar;
