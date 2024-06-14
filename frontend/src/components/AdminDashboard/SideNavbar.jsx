import "bootstrap/dist/css/bootstrap.min.css";
import "./NavBar.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

const Sidenavbar = ({ activeIndex }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/logins");
  };

  return (
    <Nav
      className="sidebar d-flex flex-column col-md-3 text-white"
      style={{
        height: "100%",
        width: "250px",
        position: "static",
        // top: 0,
        // left: 0,
        border: "1px solid #dee2e6",
      }}
    >
      <h3
        style={{
          marginLeft: "26px",
          fontSize: "35px",
          color: "black",
        }}
      >
        ShopHub.lk
        <br />
      </h3>
      {/* <hr></hr> */}
      <Nav.Link
        as={Link}
        className={`my-2 ${
          activeIndex === 0
            ? "container-color-super-active"
            : "container-color-super"
        } p-3`}
        to="/customers"
        style={{ display: "flex", alignItems: "center" }}
      >
        <span style={{ marginLeft: "10px", fontSize: "18px" }}> Customers</span>
      </Nav.Link>

      <Nav.Link
        as={Link}
        className={`my-2 ${
          activeIndex === 1
            ? "container-color-super-active"
            : "container-color-super"
        } p-3`}
        to="/requestedMember"
        style={{ display: "flex", alignItems: "center" }}
      >
        <span style={{ marginLeft: "10px", fontSize: "18px" }}>
          {" "}
          Requsted Shopes
        </span>
      </Nav.Link>
      <Nav.Link
        as={Link}
        className={`my-2 ${
          activeIndex === 2
            ? "container-color-super-active"
            : "container-color-super"
        } p-3`}
        to="/manageMember"
        style={{ display: "flex", alignItems: "center" }}
      >
        <span style={{ marginLeft: "10px", fontSize: "18px" }}>
          {" "}
          Accepted Shopes
        </span>
      </Nav.Link>
      <Nav.Link
        as={Link}
        className={`my-2 ${
          activeIndex === 3
            ? "container-color-super-active"
            : "container-color-super"
        } p-3`}
        to="/adminpromotions"
        style={{ display: "flex", alignItems: "center" }}
      >
        <span style={{ marginLeft: "10px", fontSize: "18px" }}>
          {" "}
          Promotions
        </span>
      </Nav.Link>
      <Nav.Link
        as={Link}
        className={`my-2 ${
          activeIndex === 4
            ? "container-color-super-active"
            : "container-color-super"
        } p-3`}
        to="/adminEvents"
        style={{ display: "flex", alignItems: "center" }}
      >
        <span style={{ marginLeft: "10px", fontSize: "18px" }}> Events</span>
      </Nav.Link>
      <Nav.Link
        as={Link}
        className={`my-2 ${
          activeIndex === 5
            ? "container-color-super-active"
            : "container-color-super"
        } p-3`}
        to="/LoyaltyRewordManagement"
        style={{ display: "flex" }}
      >
        <span style={{ marginLeft: "10px", fontSize: "18px" }}>
          {" "}
          Loyalty Rewords
        </span>
      </Nav.Link>

      <Nav.Link
        as={Link}
        className={`my-2 ${
          activeIndex === 6
            ? "container-color-super-active"
            : "container-color-super"
        } p-3`}
        to="/faq"
        style={{ display: "flex" }}
      >
        <span style={{ marginLeft: "10px", fontSize: "18px" }}> FAQ</span>
      </Nav.Link>
      <Nav.Link
        as={Link}
        className={`my-2 ${
          activeIndex === 7
            ? "container-color-super-active"
            : "container-color-super"
        } p-3`}
        to="/rvw"
        style={{ display: "flex" }}
      >
        <span style={{ marginLeft: "10px", fontSize: "18px" }}> Reviews</span>
      </Nav.Link>

      <Button
        onClick={handleLogout}
        href="/logins"
        style={{ backgroundColor: "black" }}
      >
        Log Out
      </Button>
    </Nav>
  );
};

export default Sidenavbar;
