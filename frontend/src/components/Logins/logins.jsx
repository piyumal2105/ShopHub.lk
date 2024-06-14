import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AdminLogIn from "../AdminLogin/AdminLogin.jsx";
import ShopLogIn from "../ShopMemberLogin/ShopMemberLogin.jsx";
import Button from "react-bootstrap/Button";

function Logins() {
  return (
    <>
      <div
        className="login-wrapper"
        style={{
          padding: "20px",
          marginTop: "100px",
          marginLeft: "100px",
        }}
      >
        <Row className="justify-content-md-center g-4">
          <Col md={6}>
            <AdminLogIn />
          </Col>
          <Col md={6}>
            <ShopLogIn />
          </Col>
        </Row>
        <br />
        <br />
        <Button
          style={{ backgroundColor: "black", alignItems: "self-end" }}
          href="/"
        >
          Home Page
        </Button>
      </div>
    </>
  );
}

export default Logins;
