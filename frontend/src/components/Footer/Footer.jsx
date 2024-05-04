import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaFacebookSquare, FaTwitterSquare, FaWhatsappSquare } from "react-icons/fa";

function Footer() {
  return (
    <footer style={{ backgroundColor: "#F0F0F0", padding: "30px 0" }}>
      <Container>
        <Row>
          <Col xs={12} md={6} lg={3}>
            <h5>Section 01</h5>
          </Col>
          <Col xs={12} md={6} lg={3}>
            <h5>Section 02</h5>
          </Col>
          <Col xs={12} md={6} lg={3}>
            <h5>Section 03</h5>
          </Col>
          <Col xs={12} md={6} lg={3}>
            <h5>Follow Us On</h5>
            <div>
              <a href="#" style={{ marginRight: "10px" }}><FaFacebookSquare style={{ height: "30px", width: "30px", color: "black" }} /></a>
              <a href="#" style={{ marginRight: "10px" }}><FaTwitterSquare style={{ height: "30px", width: "30px", color: "black" }} /></a>
              <a href="#"><FaWhatsappSquare style={{ height: "30px", width: "30px", color: "black" }} /></a>
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="text-center mt-4">
            <p>&copy; {new Date().getFullYear()} All rights reserved ShopHub.lk</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
