import React from 'react'
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Button, Col, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import img01 from "../assets/img01.png";
import img03 from "../assets/denim.png";
import img04 from "../assets/shirt01.png";
import img05 from "../assets/shirt02.png";
import { Link } from "react-router-dom";

export default function SignUp() {
  const [customers, setCustomers] = useState(0);
  const [products, setProducts] = useState(0);
  const [sellers, setSellers] = useState(0);

  useEffect(() => {
    const incrementValues = () => {
      if (customers < 20000) {
        setCustomers((prevCustomers) => prevCustomers + 100);
      }
      if (products < 2000) {
        setProducts((prevProducts) => prevProducts + 10);
      }
      if (sellers < 200) {
        setSellers((prevSellers) => prevSellers + 1);
      }
    };

    const interval = setInterval(incrementValues, 30);

    return () => clearInterval(interval);
  }, [customers, products, sellers]);

  return (
    
    <>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ backgroundColor: "black", color: "white", height: "60px" }}
      >
       
           
      </div>
      <br />
      <Header />
      <br />
      <br />
      <div className="d-flex justify-content-center align-items-center">
        <Container>
          <Row>
            <Col>
              <h1>FIND ANYTHING THAT MATCHES YOUR STYLE</h1>

              <br />
              <br />
              <Button
                variant="dark"
                style={{ borderRadius: "13px", width: "200px", height: "40px" }}
              >
                Shop Now
              </Button>
              <br />
              <br />
              <br />
              <br />
              <Row>
                <Col>
                  <h3>{customers.toLocaleString()} +</h3>
                  <h5>Happy Customers</h5>
                </Col>
                <Col>
                  <h3>{products.toLocaleString()} +</h3>
                  <h5>Quality Products</h5>
                </Col>
                <Col>
                  <h3>{sellers.toLocaleString()} +</h3>
                  <h5>Sellers</h5>
                </Col>
              </Row>
            </Col>
            <Col>
              <img src={img01} />
            </Col>
          </Row>
        </Container>
      </div>
      <br />
      <br />
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ backgroundColor: "black" }}
      >
        <Navbar expand="lg">
          <Container>
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <Nav.Link
                  href="#"
                  style={{ color: "white", marginRight: "100px" }}
                >
                  Fashion
                </Nav.Link>
                <Nav.Link
                  href="#"
                  style={{ color: "white", marginRight: "100px" }}
                >
                  Electronics
                </Nav.Link>
                <Nav.Link
                  href="#"
                  style={{ color: "white", marginRight: "100px" }}
                >
                  Groceries
                </Nav.Link>
                <Nav.Link
                  href="#"
                  style={{ color: "white", marginRight: "100px" }}
                >
                  Beauty
                </Nav.Link>
                <Nav.Link
                  href="#"
                  style={{ color: "white", marginRight: "100px" }}
                >
                  Sports
                </Nav.Link>
                <Nav.Link
                  href="#"
                  style={{ color: "white", marginRight: "100px" }}
                >
                  Toys
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
      <div
        style={{
          minHeight: "65vh",
          maxHeight: "auto",
        }}
      >
    



      </div>
      <Footer />






    </>




        


   )


}
