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
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/allProducts">Products</Nav.Link>
            <Nav.Link href="/aboutus">About Us</Nav.Link>
            <Nav.Link href="/contactus">Contact Us</Nav.Link>
            <Nav.Link href="/promotions"> Promotions</Nav.Link>
            <Nav.Link href="/events"> Events</Nav.Link>
            <Nav.Link href="#">Drive and Pickup</Nav.Link>
            <Nav.Link href="/LoyaltyPointsPage">Loyalty Points</Nav.Link>
            <Nav.Link href="/faq">FAQ</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
