import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
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
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
            </Form>
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/allProducts">Products</Nav.Link>
            <Nav.Link href="#">About Us</Nav.Link>
            <Nav.Link href="#">Contact Us</Nav.Link>
            <Nav.Link href="#">Events and Promotions</Nav.Link>
            <Nav.Link href="#">Drive and Pickup</Nav.Link>
            <Nav.Link href="/cart">Cart</Nav.Link>
            <Nav.Link as={Link} to="/onpickuplandingpage">Drive And Pickup</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
