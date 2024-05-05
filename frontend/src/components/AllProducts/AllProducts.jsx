import { useState } from "react";
import { useCart } from "../Cart/CartContext";
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
import "./style.css";
import { Button } from "react-bootstrap";
import Swal from 'sweetalert2';

const AllProducts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [memberData, setMemberData] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const { addToCart } = useCart();

  const handleNameClick = (member) => {
    setMemberData(member);
    setSelectedProductId(member.cusProductID);
    setShowModal(true);
  };

  const handleAddToCart = async () => {
    try {
      const response = await axios.post("http://localhost:3001/cart/add", {
        productId: selectedProductId
      });
      addToCart(memberData);
      console.log("Item added to cart:", response.data);
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  const handleAddToOnPickups = async () => {
    try {
      const response = await axios.post("http://localhost:3001/onpickup/add", {
        productId: selectedProductId
      });
      addToCart(memberData);
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Product added to On-Pickup list successfully!',
        showConfirmButton: false,
        timer: 1500
      });
      console.log("Item added to On-Pickup list:", response.data);
    } catch (error) {
      console.error("Error adding item to On-Pickup list:", error);
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Product added to On-Pickup successfully!',
      });
    }
  };

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

  const uniqueCategory = [
    "Fashion and Apparel",
    "Entertainment and Leisure",
    "Home and Furniture",
    "Health and Beauty",
    "Food and Dining",
    "Entertainment and Leisure",
    "Jewelry and Watches",
  ];

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
                    <Col>
                      <Button 
                         onClick={handleAddToOnPickups}
                        style={{
                          backgroundColor: "black",
                          borderColor: "black",
                        }}
                      >
                        On Pick-Up
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
