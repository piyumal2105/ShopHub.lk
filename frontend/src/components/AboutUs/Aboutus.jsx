import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Row, Col, Container } from "react-bootstrap";
import img01 from "../../assets/shoppingmall.jpg";
import img02 from "../../assets/offers.jpg";
import img03 from "../../assets/offero2.jpg";
import img04 from "../../assets/vision.jpg";
import img05 from "../../assets/commitment.jpg";

function Aboutus() {
  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ backgroundColor: "black", color: "white", height: "60px" }}
      >
        <center>Sign Up and get 10% off. Sign Up</center>
      </div>
      <br />
      <Header />
      <br />
      <br />
      <h2
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        About Us
      </h2>
      <div>
        <p
          style={{
            textAlign: "justify",
            padding: "20px",
            paddingLeft: "110px",
            paddingRight: "110px",
          }}
        >
          Welcome to ShopHub.lk, the premier destination for all your shopping
          needs in the heart of our vibrant community. Founded in 2005,
          ShopHub.lk has grown from a modest beginning to become one of the most
          comprehensive and fully functional shopping malls in the region. Our
          name, ShopHub.lk, reflects our commitment to becoming a central
          meeting point for shoppers seeking variety, quality, and an
          unforgettable shopping experience.
        </p>
        <br />
        <br />
        <center>
          <div>
            <Container>
              <Row className="justify-content-center">
                <Col xs={12} md={6}>
                  <div>
                    <h3>
                      Our Journey <br />
                    </h3>
                  </div>
                  <br />
                  <div>
                    <p style={{ textAlign: "justify" }}>
                      Our journey began with a vision to create a space where
                      families, friends, and individuals could gather to enjoy
                      not just shopping but a community-centric place where
                      memories are made. What started as a dream has, over the
                      years, transformed into a bustling mall that houses
                      everything from world-renowned brands to local treasures,
                      making ShopHub.lk a one-stop destination for shopping,
                      entertainment, and dining.
                    </p>
                  </div>
                </Col>
                <Col xs={12} md={6}>
                  <img
                    src={img01}
                    style={{ width: "80%", borderRadius: "10px" }}
                  />
                </Col>
              </Row>
              <br />
              <br />
              <br />
              <Row className="justify-content-center">
                <Col xs={12} md={6}>
                  <div>
                    <h3>
                      What We Offer <br />
                    </h3>
                  </div>
                  <br />
                  <div>
                    <p style={{ textAlign: "justify" }}>
                      At ShopHub.lk, we are proud to offer an extensive range of
                      products and services across multiple categories. From the
                      latest fashion trends and technology gadgets to home decor
                      and gourmet food, our carefully curated selection meets
                      the diverse needs and preferences of our shoppers. Our
                      mall is home to:
                      <br />
                      <br />
                      <ul style={{ marginLeft: "-20px" }}>
                        <li>
                          <strong>A Wide Array of Retail Stores: </strong>
                          Featuring both international brands and local
                          favorites, we ensure that you have access to the best
                          products and services under one roof.
                        </li>
                        <br />
                        <li>
                          <strong>Dining Delights: </strong>
                          Our food court and restaurants offer a variety of
                          culinary experiences, from fast food to fine dining,
                          catering to every palate.
                        </li>
                        <br />
                        <li>
                          <strong>Entertainment for Everyone: </strong>
                          With our state-of-the-art cinema, gaming zones, and
                          regular live events, ShopHub.lk is more than a
                          shopping destination it's a place to relax and have
                          fun.
                        </li>
                        <br />
                        <li>
                          <strong>Convenience Services: </strong>
                          Understanding the needs of our customers, we provide
                          ample parking, easy accessibility, and a range of
                          customer services to make your shopping experience
                          seamless and enjoyable.
                        </li>
                      </ul>
                    </p>
                  </div>
                </Col>
                <Col xs={12} md={6}>
                  <Row className="justify-content-center">
                    <img
                      src={img02}
                      style={{ width: "80%", borderRadius: "20px" }}
                    />
                  </Row>
                  <br />
                  <Row className="justify-content-center">
                    <img
                      src={img03}
                      style={{ width: "80%", borderRadius: "20px" }}
                    />
                  </Row>
                </Col>
              </Row>
              <br />
              <br />
              <br />
              <Row className="justify-content-center">
                <Col xs={12} md={6}>
                  <div>
                    <h3>
                      Our Vision <br />
                    </h3>
                  </div>
                  <br />
                  <div>
                    <p style={{ textAlign: "justify" }}>
                      Our vision is to not just be a shopping mall but to be a
                      community hub where people feel welcomed, entertained, and
                      valued. We are committed to providing an exceptional
                      shopping environment that is safe, clean, and vibrant. At
                      ShopHub.lk, we are constantly evolving, embracing change,
                      and innovating to meet the changing needs of our customers
                      and the community we serve.
                    </p>
                  </div>
                </Col>
                <Col xs={12} md={6}>
                  <img
                    src={img04}
                    style={{ width: "80%", borderRadius: "10px" }}
                  />
                </Col>
              </Row>
              <br />
              <br />
              <br />
              <Row className="justify-content-center">
                <Col xs={12} md={6}>
                  <div>
                    <h3>
                      Commitment to the Community <br />
                    </h3>
                  </div>
                  <br />
                  <div>
                    <p style={{ textAlign: "justify" }}>
                      Community lies at the heart of everything we do.
                      ShopHub.lk is dedicated to giving back to the community
                      that has helped us grow. Through various initiatives,
                      partnerships, and events, we aim to contribute positively
                      and support local causes and organizations.
                    </p>
                  </div>
                </Col>
                <Col xs={12} md={6}>
                  <img
                    src={img05}
                    style={{ width: "80%", borderRadius: "10px" }}
                  />
                </Col>
              </Row>
              <br />
              <br />
              <br />
              <center>
                <div>
                  <p style={{ textAlign: "justify" }}>
                    Thank you for choosing ShopHub.lk as your shopping
                    destination. We look forward to welcoming you and making
                    your visit memorable.
                  </p>
                </div>
              </center>
            </Container>
          </div>
        </center>
      </div>
      <br />
      <br />
      <Footer />
    </>
  );
}

export default Aboutus;
