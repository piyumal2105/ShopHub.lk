import { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { useQuery } from "react-query";
import axios from "axios";
import NavBar from "../Header/Header";
import Footer from "../Footer/Footer";
import Modal from "react-bootstrap/Modal";
import Accordion from "react-bootstrap/Accordion";

// import { useParams } from "react-router-dom";
//import "./style.css";
import { Button } from "react-bootstrap";
import "./Faq.css";

const AllFaqs = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShowModal(false);
  };
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [faData, setFaData] = useState([]);
  //   const params = useParams();
  //   const memberId = params.id;
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const handleNameClick = (fa) => {
    setFaData(fa);
    setShowModal(true);
  };

  // use react query and fetch member data
  const { data, isLoading, isError } = useQuery("acceptedFaData", async () => {
    const response = await axios.get("http://localhost:3001/faq/faqs/getall");
    return response.data;
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error loading data</p>;
  }

  // Apply filters to the data
  const filteredData = data.filter(
    (fa) =>
      Object.values(fa).some((value) =>
        value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      ) &&
      (categoryFilter
        ? fa.category.toLowerCase() === categoryFilter.toLowerCase()
        : true)
  );

  return (
    <>
      <div
        style={{ backgroundColor: "#000", height: "60px" }}
        className="d-flex justify-content-center align-items-center"
      >
        <center>
          {/* <h5 style={{ color: "white" }}>Sign Up and get 10% off. Sign Up </h5> */}
        </center>
      </div>
      <br />
      <br />
      <NavBar />
      <center>
        <h3 style={{ color: "black" }}>FAQs </h3>
      </center>
      <br />
      <div>
        <br />
        <center>
          <div>
            <div style={{ margin: "20px", padding: "20px" }}>
              <Row xs={1} md={3} className="g-4" style={{ padding: "20px" }}>
                {filteredData.map((fa) => (
                  <Col key={fa.cusFaID}>
                    <center>
                      {/* <Card
                        style={{
                          marginBottom: "20px",
                          padding: "10px",
                          borderRadius: "10px",
                          borderWidth: "2px",
                          borderColor: "black",
                          backgroundColor: "Transparent",
                          height: "350px",
                          width: "350px",
                        }}
                        onClick={() => handleNameClick(fa)}
                      >
                        <Card.Body>
                          <br />
                          <br />
                          <Card.Title>{fa.qustion}</Card.Title>

                          <Button
                            onClick={() => handleNameClick(fa)}
                            style={{
                              backgroundColor: "Transparent",
                              borderColor: "black",
                              color: "black",
                            }}
                          >
                            <i>View more</i>
                          </Button>
                        </Card.Body>
                      </Card> */}
                      <Accordion>
                        <Accordion.Item eventKey="0">
                          <Accordion.Header>{fa.question}</Accordion.Header>
                          <Accordion.Body>{fa.answer}</Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                    </center>
                  </Col>
                ))}
              </Row>
            </div>

            {/* Modal */}

            {/* <Modal show={showModal} onHide={() => setShowModal(false)} centered>
              <Modal.Header closeButton className="custom-modal">
                <Modal.Title>{faData.faqTitle}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div
                  dangerouslySetInnerHTML={{
                    __html: faData.description,
                  }}
                />
                <hr />
                <div>
                  <p>
                    <strong>Terms & Conditions: </strong>{" "}
                    {faData.termsNconditions}
                  </p>
                  <p>
                    <strong>Valid for: </strong>{" "}
                    {new Date(faData.startDate).toLocaleDateString()}
                    <strong> -</strong>
                    {new Date(faData.endDate).toLocaleDateString()}
                  </p>
                  <p></p>
                </div>
                <br />
                <center>
                  <Row>
                    <Col>
                      <Button
                        variant="primary"
                        onClick={handleClose}
                        style={{ width: "400px", backgroundColor: "black" }}
                      >
                        Close
                      </Button>
                    </Col>
                  </Row>
                </center>
                <br />
              </Modal.Body>
            </Modal> */}
          </div>
        </center>
      </div>
      <br />
      <br />
      <Footer />
    </>
  );
};

export default AllFaqs;
