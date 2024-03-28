import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";

function ShopMemberNavbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/shopMember/login");
  };
  const handleProfile = () => {
    // Get the user ID from local storage
    const userId = JSON.parse(localStorage.getItem("user"))?.id;
    // Check if the user ID is available
    if (userId) {
      // Navigate to the profile page with the user ID
      navigate(`/shopProfile/${userId}`);
    } else {
      // Handle the case where user ID is not available
      console.error("User ID not found in local storage");
    }
  };
  return (
    <>
      <div
        style={{ backgroundColor: "black", color: "white", height: "50px" }}
      ></div>
      <Navbar expand="lg">
        <br />
        <br />
        <br />
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
              {/* <Nav.Link href="#">Accepts Stokes</Nav.Link>
              <Nav.Link href="#">Pending Stokes </Nav.Link> */}
              <Nav.Link href="/inventory">Products</Nav.Link>
              <Nav.Link href="#">Invoices</Nav.Link>
              <Nav.Link href="#">Profit And Revenue</Nav.Link>
              <Nav.Link href="#">On Pickup Orders</Nav.Link>
              <Nav.Link href="#" onClick={handleProfile}>
                Profile
              </Nav.Link>
              <Button
                href="#"
                onClick={handleLogout}
                style={{ backgroundColor: "black", borderColor: "black" }}
              >
                Logout
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default ShopMemberNavbar;
