import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

function Header() {
  return (
    <Navbar expand="lg">
      <Container>
        <Link to="/" className="navbar-brand">

          <dev> <center>
          
          <h3 style={{ fontSize: "35px" }}>ShopHub.lk</h3>
          </center>
          </dev>

        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="#">Products</Nav.Link>
            <Nav.Link as={Link} to="#">About Us </Nav.Link>
            <Nav.Link as={Link} to="#">Contact Us</Nav.Link>
            {/* <Nav.Link as={Link} to="/admin/login">Admin Login</Nav.Link> */}
            <Nav.Link as={Link} to="#">Events and Promotions</Nav.Link>
            <Nav.Link as={Link} to="/onpickuplandingpage">Drive And Pickup</Nav.Link> {/* Add link to OnPickupRegistrationForm */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
