import { useState } from "react";
import {useCart} from "../Cart/CartContext";
import Table from "react-bootstrap/Table";
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

const AllProducts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [memberData, setMemberData] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const {addToCart} = useCart();
  //   const params = useParams();
  //   const memberId = params.id;


  const handleNameClick = (member) => {
    setMemberData(member);
    setSelectedProductId(member.cusProductID);
    setShowModal(true);
  };

  const handleAddToCart = async () => {
    try {
      // Send a POST request to the backend API to add the product to the cart
      const response = await axios.post("http://localhost:3001/cart/add", {
        productId: selectedProductId // Use the selected product ID
      });
      addToCart(memberData);

      // Handle success/failure as needed
      console.log("Item added to cart:", response.data);
    } catch (error) {
      console.error("Error adding item to cart:", error);
      // Handle error
    }
  };

  // use react query and fetch member data
  const { data, isLoading, isError } = useQuery(
    "acceptedMemberData",
    async () => {
      const response = await axios.get("http://localhost:3001/product");
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
    "Entertainment and Leisure",
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
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ backgroundColor: "black", color: "white", height: "60px" }}
      >
        <center>Sign Up and get 10% off. Sign Up</center>
      </div>
      <br />
      <NavBar />
      <br />
      <div>
        <br />
        <center>
          <div>
            <center>
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
              <Row xs={1} md={3} className="g-4" style={{ padding: "20px" }}>
                {filteredData.map((member) => (
                  <Col key={member.cusMemberID}>
                    <Card style={{ marginBottom: "20px", padding: "15px" }}>
                      <Card.Body>
                        <Card.Title>{member.name}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">
                          {member.category}
                        </Card.Subtitle>
                        <br />
                        <br />
                        <Button
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
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
              <Modal.Header closeButton>
                <Modal.Title>Product Details</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="text-center">
                  {memberData.profilePicture && (
                    <img
                      src={memberData.profilePicture}
                      alt="Profile"
                      className="img-fluid rounded-circle mb-3"
                      style={{ maxWidth: "150px" }}
                    />
                  )}
                  <h4>{memberData.name}</h4>
                  <p className="text-muted">{memberData.description}</p>
                </div>
                <hr />
                <div>
                  <p>
                    <strong>Product ID: </strong> {memberData.cusProductID}
                  </p>
                  <p>
                    <strong>Product Description: </strong>{" "}
                    {memberData.description}
                  </p>
                  <p>
                    <strong>Category: </strong> {memberData.category}
                  </p>
                  <p>
                    <strong>Price: </strong> {memberData.sellingPrice}
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
                         onClick={handleAddToCart}
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
};

export default AllProducts;
