import { Container, Row, Col } from "react-bootstrap";
import {
  FaFacebookSquare,
  FaTwitterSquare,
  FaWhatsappSquare,
} from "react-icons/fa";
import img01 from "../../assets/visamaster.png";

function Footer() {
  const socialMediaColors = {
    facebook: "black",
    instagram: "black",
    twitter: "black",
  };

  return (
    <footer style={{ backgroundColor: "#F0F0F0", padding: "30px 0" }}>
      <Container>
        <Row>
          <Col xs={12} md={6} lg={3} className="mb-3">
            <h5>About Us</h5>
            <p>
              ShopHub.lk is your ultimate shopping destination, offering a wide
              range of products from fashion to electronics.
            </p>
          </Col>
          <Col xs={12} md={6} lg={3} className="mb-3">
            <h5>Customer Service</h5>
            <p>Contact Us</p>
            <p>FAQs</p>
            <p>Shipping & Returns</p>
          </Col>
          <Col xs={12} md={6} lg={3} className="mb-3">
            <h5>Payment Options</h5>
            <div>
              <img src={img01} alt="Visa" style={{ height: "35px" }} />
            </div>
          </Col>
          <Col xs={12} md={6} lg={3} className="mb-3">
            <h5>Follow Us On</h5>
            <div>
              <a
                href="#"
                style={{
                  marginRight: "10px",
                  color: socialMediaColors.facebook,
                }}
              >
                <FaFacebookSquare style={{ height: "30px", width: "30px" }} />
              </a>

              <a
                href="#"
                style={{
                  marginRight: "10px",
                  color: socialMediaColors.twitter,
                }}
              >
                <FaTwitterSquare style={{ height: "30px", width: "30px" }} />
              </a>
              {/* whatsapp */}
              <a href="#" style={{ color: socialMediaColors.twitter }}>
                <FaWhatsappSquare style={{ height: "30px", width: "30px" }} />
              </a>
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="text-center mt-4">
            <p>
              &copy; {new Date().getFullYear()} All rights reserved ShopHub.lk
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
