import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
// import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";

function Header() {
  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          backgroundColor: "black",
          color: "white",
          height: "60px",
          fontSize: "23px",
          fontWeight: "600",
        }}
      >
        <center>Sign Up and get 10% off.</center>
      </div>
      <Navbar
        expand="lg"
        style={{ backgroundColor: "#F0F0F0", height: "80px" }}
      >
        <Container>
          <Nav.Link href="/">
            <h3
              style={{
                fontSize: "35px",
              }}
            >
              ShopHub.lk
              <br />
            </h3>
          </Nav.Link>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/allProducts">Products</Nav.Link>
              {/* <Nav.Link href="/aboutus">About Us</Nav.Link> */}
              {/* <Nav.Link href="/contactus">Contact Us</Nav.Link> */}
              <Nav.Link href="/promotions"> Promotions</Nav.Link>
              <Nav.Link href="/events"> Events</Nav.Link>
              <Nav.Link href="#">Drive and Pickup</Nav.Link>
              <Nav.Link href="/LoyaltyPointsPage">Loyalty Points</Nav.Link>
              {/* <Nav.Link href="/faquser">FAQ</Nav.Link> */}
              <Button
                style={{ backgroundColor: "black" }}
                href="/customers/register"
              >
                Sign Up
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
