import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";

function Header() {
  return (
    <Navbar expand="lg">
      <Container>
        <h3
          style={{
            fontSize: "35px",
          }}
        >
          ShopHub.lk
          <br />
        </h3>
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
            <Nav.Link href="/cart"><b>Cart</b></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
