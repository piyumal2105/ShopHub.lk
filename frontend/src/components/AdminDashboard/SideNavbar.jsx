import "bootstrap/dist/css/bootstrap.min.css";
import "./NavBar.css";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Sidenavbar = ({ activeIndex }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/admin/login");
  };
  return (
    <Nav
      className=" sidebar d-flex flex-column col-md-3 text-white"
      style={{
        height: "100%",
        width: "250px",
        position: "fixed",
        top: 0,
        left: 0,
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
      <hr></hr>
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
        to="#"
        style={{ display: "flex", alignItems: "center" }}
      >
        <span style={{ marginLeft: "10px", fontSize: "18px" }}>
          {" "}
          Requsted Shop Members
        </span>
      </Nav.Link>
      <Nav.Link
        as={Link}
        className={`my-2 ${
          activeIndex === 2
            ? "container-color-super-active"
            : "container-color-super"
        } p-3`}
        to="#"
        style={{ display: "flex", alignItems: "center" }}
      >
        <span style={{ marginLeft: "10px", fontSize: "18px" }}>
          {" "}
          Accepted Shop Members
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
          activeIndex === 3
            ? "container-color-super-active"
            : "container-color-super"
        } p-3`}
        to="/adminEvents"
        style={{ display: "flex", alignItems: "center" }}
      >
        <span style={{ marginLeft: "10px", fontSize: "18px" }}>
          {" "}
           Events
        </span>
      </Nav.Link>
      <Nav.Link
        onClick={handleLogout}
        className={`my-2 ${
          activeIndex === 3
            ? "container-color-super-active"
            : "container-color-super"
        } p-3`}
        to="#"
        style={{ display: "flex", alignItems: "center" }}
      >
        <span style={{ marginLeft: "10px", fontSize: "18px" }}> Logout</span>
      </Nav.Link>
    </Nav>
  );
};

export default Sidenavbar;
