import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

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
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="#">Products</Nav.Link>
            <Nav.Link href="#">About Us</Nav.Link>
            <Nav.Link href="#">Contact Us</Nav.Link>
            <Nav.Link href="/promotions"> Promotions</Nav.Link>
            <Nav.Link href="/events"> Events</Nav.Link>
            <Nav.Link href="#">Drive and Pickup</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
