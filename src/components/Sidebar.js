import React from "react";

function Sidebar() {
  return (
    <div>
      <div className="left-side-menu">
        <div className="media user-profile mt-2 mb-2">
          <img
            src="assets/images/users/avatar-7.jpg"
            className="avatar-sm rounded-circle mr-2"
            alt="Shreyu"
          />
          <img
            src="assets/images/users/avatar-7.jpg"
            className="avatar-xs rounded-circle mr-2"
            alt="Shreyu"
          />
          <div className="media-body">
            <h6 className="pro-user-name mt-0 mb-0">Nik Patel</h6>
            <span className="pro-user-desc">Administrator</span>
          </div>
          <div className="dropdown align-self-center profile-dropdown-menu">
            <a
              className="dropdown-toggle mr-0"
              data-toggle="dropdown"
              href="//"
              role="button"
              aria-haspopup="false"
            >
              <span data-feather="chevron-down" />
            </a>
            <div className="dropdown-menu profile-dropdown">
              <a
                href="pages-profile.html"
                className="dropdown-item notify-item"
              >
                <i data-feather="user" className="icon-dual icon-xs mr-2" />
                <span>My Account</span>
              </a>
              <a href="https//" className="dropdown-item notify-item">
                <i data-feather="settings" className="icon-dual icon-xs mr-2" />
                <span>Settings</span>
              </a>
              <a href="https//" className="dropdown-item notify-item">
                <i
                  data-feather="help-circle"
                  className="icon-dual icon-xs mr-2"
                />
                <span>Support</span>
              </a>
              <a
                href="pages-lock-screen.html"
                className="dropdown-item notify-item"
              >
                <i data-feather="lock" className="icon-dual icon-xs mr-2" />
                <span>Lock Screen</span>
              </a>
              <div className="dropdown-divider" />
              <a href="https//" className="dropdown-item notify-item">
                <i data-feather="log-out" className="icon-dual icon-xs mr-2" />
                <span>Logout</span>
              </a>
            </div>
          </div>
        </div>
        <div className="sidebar-content">
          {/*- Sidemenu */}
          <div id="sidebar-menu" className="slimscroll-menu">
            <ul className="metismenu" id="menu-bar">
              <li className="menu-title">Navigation</li>
              <li>
                <a href="index.html">
                  <i data-feather="home" />
                  <span className="badge badge-success float-right">1</span>
                  <span> Dashboard </span>
                </a>
              </li>
              <li className="menu-title">Apps</li>
              <li>
                <a href="apps-calendar.html">
                  <i data-feather="calendar" />
                  <span> Calendar </span>
                </a>
              </li>
              <li>
                <a href="//">
                  <i data-feather="inbox" />
                  <span> Email </span>
                  <span className="menu-arrow" />
                </a>
                <ul className="nav-second-level">
                  <li>
                    <a href="email-inbox.html">Inbox</a>
                  </li>
                  <li>
                    <a href="email-read.html">Read</a>
                  </li>
                  <li>
                    <a href="email-compose.html">Compose</a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="//">
                  <i data-feather="briefcase" />
                  <span> Projects </span>
                  <span className="menu-arrow" />
                </a>
                <ul className="nav-second-level">
                  <li>
                    <a href="project-list.html">List</a>
                  </li>
                  <li>
                    <a href="project-detail.html">Detail</a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="//">
                  <i data-feather="bookmark" />
                  <span> Tasks </span>
                  <span className="menu-arrow" />
                </a>
                <ul className="nav-second-level">
                  <li>
                    <a href="task-list.html">List</a>
                  </li>
                  <li>
                    <a href="task-board.html">Kanban Board</a>
                  </li>
                </ul>
              </li>
              <li className="menu-title">Custom</li>
              <li>
                <a href="//">
                  <i data-feather="file-text" />
                  <span> Pages </span>
                  <span className="menu-arrow" />
                </a>
                <ul className="nav-second-level">
                  <li>
                    <a href="pages-starter.html">Starter</a>
                  </li>
                  <li>
                    <a href="pages-profile.html">Profile</a>
                  </li>
                  <li>
                    <a href="pages-activity.html">Activity</a>
                  </li>
                  <li>
                    <a href="pages-invoice.html">Invoice</a>
                  </li>
                  <li>
                    <a href="pages-pricing.html">Pricing</a>
                  </li>
                  <li>
                    <a href="pages-maintenance.html">Maintenance</a>
                  </li>
                  <li>
                    <a href="pages-login.html">Login</a>
                  </li>
                  <li>
                    <a href="pages-register.html">Register</a>
                  </li>
                  <li>
                    <a href="pages-recoverpw.html">Recover Password</a>
                  </li>
                  <li>
                    <a href="pages-confirm-mail.html">Confirm</a>
                  </li>
                  <li>
                    <a href="pages-404.html">Error 404</a>
                  </li>
                  <li>
                    <a href="pages-500.html">Error 500</a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="//">
                  <i data-feather="layout" />
                  <span> Layouts </span>
                  <span className="menu-arrow" />
                </a>
                <ul className="nav-second-level">
                  <li>
                    <a href="layouts-horizontal.html">Horizontal Nav</a>
                  </li>
                  <li>
                    <a href="layouts-rtl.html">RTL</a>
                  </li>
                  <li>
                    <a href="layouts-dark.html">Dark</a>
                  </li>
                  <li>
                    <a href="layouts-scrollable.html">Scrollable</a>
                  </li>
                  <li>
                    <a href="layouts-boxed.html">Boxed</a>
                  </li>
                  <li>
                    <a href="layouts-preloader.html">With Pre-loader</a>
                  </li>
                  <li>
                    <a href="layouts-dark-sidebar.html">Dark Side Nav</a>
                  </li>
                  <li>
                    <a href="layouts-condensed.html">Condensed Nav</a>
                  </li>
                </ul>
              </li>
              <li className="menu-title">Components</li>
              <li>
                <a href="//">
                  <i data-feather="package" />
                  <span> UI Elements </span>
                  <span className="menu-arrow" />
                </a>
                <ul className="nav-second-level">
                  <li>
                    <a href="components-bootstrap.html">Bootstrap UI</a>
                  </li>
                  <li>
                    <a href="//">
                      Icons
                      <span className="menu-arrow" />
                    </a>
                    <ul className="nav-third-level">
                      <li>
                        <a href="icons-feather.html">Feather Icons</a>
                      </li>
                      <li>
                        <a href="icons-unicons.html">Unicons Icons</a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="widgets.html">Widgets</a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="//">
                  <i data-feather="file-text" />
                  <span> Forms </span>
                  <span className="menu-arrow" />
                </a>
                <ul className="nav-second-level">
                  <li>
                    <a href="forms-basic.html">Basic Elements</a>
                  </li>
                  <li>
                    <a href="forms-advanced.html">Advanced</a>
                  </li>
                  <li>
                    <a href="forms-validation.html">Validation</a>
                  </li>
                  <li>
                    <a href="forms-wizard.html">Wizard</a>
                  </li>
                  <li>
                    <a href="forms-editor.html">Editor</a>
                  </li>
                  <li>
                    <a href="forms-file-uploads.html">File Uploads</a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="charts-apex.html">
                  <i data-feather="pie-chart" />
                  <span> Charts </span>
                </a>
              </li>
              <li>
                <a href="//">
                  <i data-feather="grid" />
                  <span> Tables </span>
                  <span className="menu-arrow" />
                </a>
                <ul className="nav-second-level">
                  <li>
                    <a href="tables-basic.html">Basic</a>
                  </li>
                  <li>
                    <a href="tables-datatables.html">Advanced</a>
                  </li>
                </ul>
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
