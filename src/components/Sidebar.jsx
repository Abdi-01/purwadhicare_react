import React from "react";
import { Link } from "react-router-dom";
import { FiBookOpen, FiPackage, FiClipboard, FiFileText, FiMonitor, FiDivide } from "react-icons/fi";

function Sidebar() {
  return (
    <div>
      <div className="left-side-menu">
        <div className="sidebar-content">
          {/*- Sidemenu */}
          <div id="sidebar-menu" className="slimscroll-menu">
            <ul className="metismenu" id="menu-bar">
              <li className="menu-title">Admin</li>
              <li>
                <Link to="/dashboard">
                  <FiBookOpen />
                  <span> Sales Report </span>
                </Link>
              </li>
              <li>
                <Link to="/revenue">
                  <FiMonitor />
                  <span> Revenue</span>
                </Link>
              </li>
              <li>
                <Link to="/product-admin">
                  <FiPackage />
                  <span> Product </span>
                </Link>
              </li>
              <li className="menu-title">Admin Inventory</li>
              <li>
                 <Link to="/revenue">
                  <FiMonitor />
                  <span> Revenue </span>
                </Link>
              </li>
              <li>
                <Link to="/product-inventory">
                  <FiPackage />
                  <span> Product Inventory</span>
                </Link>
              </li>
              <li>
                <Link to="/order-recipe">
                  <FiClipboard />
                  <span> Order Recipe</span>
                </Link>
              </li>
              <li>
                <Link to="/user-transactions">
                  <FiFileText />
                  <span> User Transactions</span>
                </Link>
              </li>
              <li>
                <Link to="/recipe-list">
                  <FiDivide />
                  <span> Recipe Transactions</span>
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
