import { Container, Row, Col, Nav } from "react-bootstrap";
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
            <h5>Location</h5>
            <p className="mt-4">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.073682073073!2d79.8613663147725!3d6.927422994993073!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae25a0b1b1b1b1b%3A0x1b1b1b1b1b1b1b1b!2sShopHub.lk!5e0!3m2!1sen!2slk!4v1631533660003!5m2!1sen!2slk"
                width="90%"
                height="250px"
                style={{
                  borderRadius: "10px",
                  border: "0",
                }}
                allowfullscreen=""
                loading="lazy"
              ></iframe>
            </p>
          </Col>
          <Col xs={12} md={6} lg={3} className="mb-3">
            <h5>Get To Know Us</h5>
            <Nav.Link href="/contactus">Contact Us</Nav.Link>
            <Nav.Link href="/faquser">FAQ</Nav.Link>
            <Nav.Link href="/aboutus">About Us</Nav.Link>
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
