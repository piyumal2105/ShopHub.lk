import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { Container, Card } from 'react-bootstrap'
import { Button, Col, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import img01 from "../../assets/img01.png";

function OnPickupCart() {
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
                <center>Sign Up and get 10% off. Sign Up</center>
            </div>
            <br />
            <br /><br />
            <Header />
            <br /><br />
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
            <br /><br /><br />
            <div>
                <center>
                    <Container>
                        <Card style={{ height: "200px" }} className="d-flex justify-content-center align-items-center">
                            {/* <Card.Header>Featured</Card.Header> */}
                            <br /><br />
                            <br />
                            <Card.Body>Your Onpickups are empty</Card.Body>

                        </Card>
                    </Container>
                </center>
            </div>
            <br /><br />
            <br />
            <br /><br />
            <br />
            <br /><br />
            <br />
            
            <Footer />
        </>
    )
}

export default OnPickupCart
