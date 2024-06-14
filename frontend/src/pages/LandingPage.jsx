import { useState, useEffect } from "react";
import { Container, Button, Col, Row } from "react-bootstrap";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Carousel from "react-bootstrap/Carousel";
import img01 from "../assets/img01.png";
import img02 from "../assets/ofer.png";
import { useHotkeys } from "react-hotkeys-hook";
import Card from "react-bootstrap/Card";
import { FaSackDollar } from "react-icons/fa6";
import { FaCartPlus } from "react-icons/fa";
import { FaUserFriends } from "react-icons/fa";

function LandingPage() {
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

  // Setup the hotkey
  useHotkeys("ctrl+enter", () => {
    window.location.href = "/logins";
  });

  return (
    <>
      <Header />
      <div className="d-flex justify-content-center align-items-center mt-5">
        <Container>
          <Row>
            <Col style={{ marginTop: "30px" }}>
              <h1>FIND ANYTHING THAT MATCHES YOUR STYLE</h1>
              <br />
              <p style={{ textAlign: "justify" }}>
                ShopHub.lk is the best place to find the best deals on all the
                products you love. From clothing to electronics, we have it all.
                We have a wide range of products from the best sellers in the
                country.
              </p>
              <br />
              <Button
                style={{
                  borderRadius: "13px",
                  width: "200px",
                  backgroundColor: "black",
                  borderColor: "black",
                }}
                href="/allProducts"
              >
                Shop Now
              </Button>
              <br />
              <br />
            </Col>
            <Col style={{ marginTop: "-50px" }}>
              <img src={img02} alt="Landing Page Image" />
            </Col>
          </Row>
        </Container>
      </div>
      <br />
      <br />
      <br />
      <center>
        <Row className="g-0">
          <Col>
            <Card
              style={{
                width: "23rem",
                backgroundColor: "#F0F0F0",
                textAlign: "left",
              }}
            >
              <Card.Body>
                <Row className="g-0">
                  <Col>
                    <FaUserFriends
                      style={{ fontSize: "70px", marginLeft: "12px" }}
                    />
                  </Col>
                  <Col>
                    <Card.Title>
                      <h3>{customers.toLocaleString()} +</h3>
                    </Card.Title>
                    <Card.Text>
                      <h5>Happy Customers</h5>
                    </Card.Text>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card
              style={{
                width: "23rem",
                backgroundColor: "#F0F0F0",
                textAlign: "left",
              }}
            >
              <Card.Body>
                <Row className="g-0">
                  <Col>
                    <FaCartPlus
                      style={{ fontSize: "70px", marginLeft: "12px" }}
                    />
                  </Col>
                  <Col>
                    <Card.Title>
                      <h3>{products.toLocaleString()} +</h3>
                    </Card.Title>
                    <Card.Text>
                      <h5>Quality Products</h5>
                    </Card.Text>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card
              style={{
                width: "23rem",
                backgroundColor: "#F0F0F0",
                textAlign: "left",
              }}
            >
              <Card.Body>
                <Row className="g-0">
                  <Col>
                    <FaSackDollar
                      style={{ fontSize: "70px", marginLeft: "12px" }}
                    />
                  </Col>
                  <Col>
                    <Card.Title>
                      <h3>{sellers.toLocaleString()} +</h3>
                    </Card.Title>
                    <Card.Text>
                      <h5>Sellers</h5>
                    </Card.Text>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </center>
      <br />
      <br />
      <br />
      <center>
        <div
          className="d-flex justify-content-center align-items-center"
          style={{
            color: "white",
            backgroundColor: "black",
            fontWeight: "600",
            fontSize: "15px",
            height: "50px",
          }}
        >
          <marquee width="85%">
            Welcome to ShopHub.lk. We're delighted to have you here. Explore a
            world of shopping, dining, and entertainment with us.
          </marquee>
        </div>
      </center>

      <div
        style={{
          minHeight: "65vh",
          maxHeight: "auto",
        }}
      >
        <br />
        <br />
        <center>
          <div>
            <Carousel>
              <Carousel.Item interval={1500}>
                <img
                  style={{ maxHeight: "450px", maxWidth: "1425px" }}
                  src="https://i.ytimg.com/vi/LFlW4QhUUfE/maxresdefault.jpg"
                />

                <Carousel.Caption>
                  <h3>Exclusive Card Offers for you</h3>
                  <p>NDB cards only valid</p>
                </Carousel.Caption>
              </Carousel.Item>
              {/* <Carousel.Item interval={1000}>
                <img
                  style={{ maxHeight: "450px", maxWidth: "1425px" }}
                  src="https://scontent.fcmb2-2.fna.fbcdn.net/v/t39.30808-6/299950081_5727174290647027_6316019789937536919_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeEEraUhvQnnKFMlnKrJiEOzTiRYGTkf_XNOJFgZOR_9c0GmlN0bd8tsaFEo95BNqeT52wALBvIg94UnlMt7OPo0&_nc_ohc=KpXquOayQLIQ7kNvgEIoLPO&_nc_ht=scontent.fcmb2-2.fna&oh=00_AfASTJWVrCGX6El0fY-ocvzPPeH02hN3LRzU3THJJWdS-w&oe=663B0408"
                />

                <Carousel.Caption>
                  <h3>New Arrivals......!</h3>
                  <p>Latest desings & offers</p>
                </Carousel.Caption>
              </Carousel.Item> */}
              <Carousel.Item interval={1500}>
                <img
                  style={{ maxHeight: "450px", maxWidth: "1425px" }}
                  className="img-size"
                  src="https://exclusivelines.lk/wp-content/uploads/2023/06/OFFER-BANNER.png"
                />

                <Carousel.Caption>
                  <h3>Limited time Offers</h3>
                  <p>Up to 50% on selected items.</p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </div>
        </center>
        <br />
        <br />
      </div>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ backgroundColor: "black", color: "white", height: "50px" }}
      >
        Register as a shop member and sell your items.
        <Button
          // target="_blank"
          rel="noopener noreferrer"
          href="/memberRegistration"
          style={{ backgroundColor: "black", borderColor: "black" }}
        >
          Sign Up
        </Button>
      </div>
      <Footer />
    </>
  );
}

export default LandingPage;
