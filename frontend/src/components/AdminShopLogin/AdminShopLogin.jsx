import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AdminLogin from "../AdminLogin/AdminLogin";
import ShopMemberLogin from "../ShopMemberLogin/ShopMemberLogin";

function AdminShopLogin() {
  return (
    <>
      <Row>
        <Col>
          <AdminLogin />
        </Col>
        <Col>
          <ShopMemberLogin />
        </Col>
      </Row>
    </>
  );
}

export default AdminShopLogin;
