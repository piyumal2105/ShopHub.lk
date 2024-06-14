import { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { useQuery } from "react-query";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import NavBar from "../Header/Header";
import Footer from "../Footer/Footer";
import Modal from "react-bootstrap/Modal";
// import { useParams } from "react-router-dom";
import "./style.css";
import { Button } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import img01 from "../../assets/productimg01.png";
import img02 from "../../assets/productimg02.png";
// import Container from "react-bootstrap/Container";
// import img01 from "../../assets/img01.png";

function AllProducts() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [memberData, setMemberData] = useState([]);
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

  const handleNameClick = (member) => {
    setMemberData(member);
    setShowModal(true);
  };

  // use react query and fetch member data
  const { data, isLoading, isError } = useQuery(
    "acceptedMemberData",
    async () => {
      const response = await axios.get(`http://localhost:3001/product`);
      return response.data;
    }
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error loading data</p>;
  }

  //Extract unique country for dropdown options
  const uniqueCategory = [
    "Fashion and Apparel",
    "Electronics and Technology",
    "Home and Furniture",
    "Health and Beauty",
    "Food and Dining",
    "Entertainment and Leisure",
    "Jewelry and Watches",
  ];

  // Apply filters to the data
  const filteredData = data.filter(
    (member) =>
      Object.values(member).some((value) =>
        value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      ) &&
      (categoryFilter
        ? member.category.toLowerCase() === categoryFilter.toLowerCase()
        : true)
  );

  return (
    <>
      <NavBar />
      <div>
        <br />
        <center>
          <div>
            <center>
              <h2>Products</h2>
              <br />
              <div>
                <Carousel>
                  <Carousel.Item interval={3000}>
                    <img
                      src={img01}
                      style={{
                        maxWidth: "1425px",
                        maxHeight: "450px",
                      }}
                    />
                    <Carousel.Caption></Carousel.Caption>
                  </Carousel.Item>
                  <Carousel.Item interval={3000}>
                    <img
                      src={img02}
                      style={{
                        maxWidth: "1425px",
                        maxHeight: "450px",
                      }}
                    />
                    <Carousel.Caption></Carousel.Caption>
                  </Carousel.Item>
                  {/* <Carousel.Item interval={3000}>
                    <img
                      src={img01}
                      style={{ width: "80%", borderRadius: "10px" }}
                    />
                    <Carousel.Caption></Carousel.Caption>
                  </Carousel.Item> */}
                </Carousel>
              </div>
              <br />
              <br />

              <div className="filter-container">
                <input
                  className="filter-input"
                  type="text"
                  placeholder="Search By Product Name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />

                <select
                  className="filter-select"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  <option value="">Filter by Category...</option>
                  {uniqueCategory.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>
            </center>
            <div style={{ margin: "20px", padding: "20px" }}>
              <Row xs={1} md={3} className="g-5" style={{ padding: "20px" }}>
                {filteredData.map((member) => (
                  <Col key={member.cusMemberID}>
                    <Card
                      style={{
                        padding: "15px",
                      }}
                    >
                      <Card.Body>
                        <Card.Img
                          variant="top"
                          src={member.productImage}
                          style={{
                            width: "300px",
                            height: "230px",
                            borderRadius: "10px",
                          }}
                        />
                        <br />
                        <br />
                        <Card.Title style={{ textAlign: "left" }}>
                          {member.name}
                        </Card.Title>
                        <Card.Subtitle
                          className="mb-2 "
                          style={{ textAlign: "left" }}
                        >
                          {member.category}
                        </Card.Subtitle>
                        <Button
                          className="mt-3"
                          onClick={() => handleNameClick(member)}
                          style={{
                            backgroundColor: "black",
                            borderColor: "black",
                          }}
                        >
                          See More
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>

            {/* Modal */}
            <Modal
              size="lg"
              show={showModal}
              onHide={() => setShowModal(false)}
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title>Product Details</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="text-center">
                  <br />
                  {memberData.productImage && (
                    <img
                      src={memberData.productImage}
                      alt="Profile"
                      style={{
                        width: "500px",
                        height: "250px",
                        borderRadius: "10px",
                      }}
                    />
                  )}
                  <br />
                  <br />
                  <h4>{memberData.name}</h4>
                  <p className="text-muted">{memberData.description}</p>
                </div>
                <hr />
                <br />
                <div style={{ marginLeft: "230px" }}>
                  <p>
                    <strong>Product Description: </strong>{" "}
                    {memberData.description}
                  </p>
                  <p>
                    <strong>Category: </strong> {memberData.category}
                  </p>
                  <p>
                    <strong>Price: </strong> Rs. {memberData.sellingPrice}.00
                  </p>
                  <p>
                    <strong>Available Stokes: </strong> {memberData.quantity}{" "}
                    Items Available
                  </p>
                </div>

                <br />
                <center>
                  <Row>
                    <Col>
                      <Button
                        style={{
                          backgroundColor: "black",
                          borderColor: "black",
                        }}
                      >
                        Buy Now
                      </Button>
                    </Col>
                    <Col>
                      <Button
                        style={{
                          backgroundColor: "black",
                          borderColor: "black",
                        }}
                      >
                        Add to cart
                      </Button>
                    </Col>
                  </Row>
                </center>
                <br />
              </Modal.Body>
            </Modal>
          </div>
        </center>
      </div>
      <br />
      <br />
      <Footer />
    </>
  );
}

export default AllProducts;
