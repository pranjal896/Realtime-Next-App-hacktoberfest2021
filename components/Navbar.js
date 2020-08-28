import React from "react";
import { Nav, Navbar, Button } from "react-bootstrap";

const AppNavbar = ({ onClick }) => {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand>Realtime Next App</Navbar.Brand>
      <Nav className="ml-auto">
        <Button variant="outline-info" onClick={onClick}>
          Logout
        </Button>
      </Nav>
    </Navbar>
  );
};

export default AppNavbar;
