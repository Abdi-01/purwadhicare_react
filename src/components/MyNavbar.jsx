import React from "react";
import {
  Navbar,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  Dropdown,
  DropdownItem,
  NavbarBrand,
  NavbarText,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";

import { Link } from "react-router-dom";

class MyNavbar extends React.Component {
  render() {
    return (
      <div>
        <Navbar color="light" light>
          <NavbarBrand>Purwadhicare</NavbarBrand>
          <Nav>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Pages
              </DropdownToggle>

              <DropdownMenu right>
                <DropdownItem>
                  <Link to="/cart">Cart</Link>
                </DropdownItem>
                <DropdownItem>
                  <Link to="/history">History</Link>
                </DropdownItem>
                <DropdownItem>
                  <Link to="/admin">Admin</Link>
                </DropdownItem>
                <DropdownItem>Page 4</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <NavItem>
              <NavbarText>Hello, username </NavbarText>
            </NavItem>
          </Nav>
        </Navbar>
      </div>
    );
  }
}

export default MyNavbar;
