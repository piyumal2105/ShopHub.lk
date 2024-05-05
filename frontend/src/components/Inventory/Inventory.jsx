import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useQuery } from "react-query";
import EditLineIcon from "remixicon-react/EditLineIcon";
import DeleteBinLineIcon from "remixicon-react/DeleteBinLineIcon";
import Swal from "sweetalert2";
import "primereact/resources/themes/saga-blue/theme.css";
import "react-phone-number-input/style.css";
import ShopMemberNavbar from "../ShopMemberNavbar/ShopMemberNavBar";
import { Col, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function Inventory() {
  const [show, setShow] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteID, setDeleteID] = useState("");
  const [showEdit, setShowEdit] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAddedDate, setSelectedAddedDate] = useState();
  const [selectedExpireDate, setSelectedExpireDate] = useState();
  const handleRowClick = (product) => {
    setSelectedProduct(product);
    setShowDetail(true);
  };
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    reset,
    watch,
  } = useForm({
    validateInputChanges: true,
    initialValues: {
      name: "",
      description: "",
      category: "",
      actualPrice: "",
      sellingPrice: "",
      quantity: "",
      added_date: "",
      expire_date: "",
      productImage: "",
    },
  });

  const editProductForm = useForm({
    validateInputChanges: true,
    initialValues: {
      _id: "",
      name: "",
      description: "",
      category: "",
      actualPrice: "",
      sellingPrice: "",
      quantity: "",
      added_date: "",
      expire_date: "",
      productImage: "",
    },
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  //use react query and fetch product data
  const { data, isLoading, isError, refetch } = useQuery(
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

  const editProduct = async () => {
    try {
      const editProductDetails = editProductForm.getValues();
      await axios.put(
        `http://localhost:3001/product/updateProduct/${editProductDetails._id}`,
        editProductDetails
      );
      editProductForm.reset();
      setShowEdit(false);
      Swal.fire({
        icon: "success",
        title: "Product Update Successfully",
        text: "You have successfully update a product",
      });
      refetch();
    } catch (err) {
      console.log("edit form error", err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  const addProduct = async (formData) => {
    try {
      console.log(formData);
      await axios.post("http://localhost:3001/product/addProduct", formData);

      reset();
      Swal.fire({
        icon: "success",
        title: "Product Added Successfully",
        text: "You have successfully added a product",
      });
      refetch();
    } catch (err) {
      console.log("Add form error:", err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  const deleteProduct = async (_id) => {
    try {
      await axios.delete(`http://localhost:3001/product/delete/${_id}`, {
        withCredentials: true,
      });
      Swal.fire({
        title: "Deleted!",
        text: "Product has been deleted.",
        icon: "success",
      });
      refetch();

      setShowDelete(false);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };
  const handleDelete = (_id) => {
    setShowDelete(true);
    setDeleteID(_id);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);

  const handleCloseEdit = () => {
    setShowEdit(false);
    editProductForm.reset(); // Reset the form
  };

  const handleShowEdit = () => setShowEdit(true);

  const filteredData = data.filter((member) =>
    Object.values(member).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  // Image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      // `reader.result` contains the base64 encoded image data
      setValue("productImage", reader.result); // Store base64 data in form state
      editProductForm.setValue("productImage", reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
      const imageUrl = URL.createObjectURL(file);
      setImagePreviewUrl(imageUrl); // Convert image to base64 string
    }
  };

  // Generate report
  const downloadPdfReport = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      theme: "striped",
      head: [
        [
          "Product ID",
          "Product Name",
          "Description",
          "Category",
          "Actual Price",
          "Selling Price",
          "Quantity",
          "Added Date",
          "Expire Date",
        ],
      ],
      body: data.map((item) => [
        item.cusProductID,
        item.name,
        item.description,
        item.category,
        item.actualPrice,
        item.sellingPrice,
        item.quantity,
        new Date(item.added_date).toLocaleDateString(),
        new Date(item.expire_date).toLocaleDateString(),
      ]),
      columnStyles: { 0: { cellWidth: "auto" } },
    });
    doc.save("products_report.pdf");
  };

  return (
    <>
      <center>
        <div>
          <ShopMemberNavbar />
          {/* add product model  */}
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add Products</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Product Image</Form.Label>
                  <Form.Control
                    type="file"
                    onChange={(e) => handleImageUpload(e)}
                    accept="image/*"
                  />
                  {imagePreviewUrl && (
                    <img
                      src={imagePreviewUrl}
                      alt="Preview"
                      style={{
                        width: "150px",
                        height: "100px",
                        marginTop: "10px",
                      }}
                    />
                  )}
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>
                    Product Name <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="name"
                    {...register("name", {
                      required: true,
                    })}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>
                    Product Description<span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    {...register("description", {
                      required: true,
                    })}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>
                    Category <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    as="select"
                    {...register("category", { required: true })}
                  >
                    <option value="">Select Category</option>
                    <option value="Fashion and Apparel">
                      Fashion and Apparel
                    </option>
                    <option value="Electronics and Technology">
                      Electronics and Technology
                    </option>
                    <option value="Home and Furniture">
                      Home and Furniture
                    </option>
                    <option value="Health and Beauty">Health and Beauty</option>
                    <option value="Food and Dining">Food and Dining</option>
                    <option value="Entertainment and Leisure">
                      Entertainment and Leisure
                    </option>
                    <option value="Jewelry and Watches">
                      Jewelry and Watches
                    </option>
                  </Form.Control>
                  {errors.category && (
                    <span className="text-danger">This is required.</span>
                  )}
                  <br />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>
                    Actual Price <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="number"
                    {...register("actualPrice", {
                      required: true,
                    })}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>
                    Selling Price <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="number"
                    {...register("sellingPrice", {
                      required: true,
                    })}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>
                    Quantity <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="number"
                    {...register("quantity", {
                      required: true,
                    })}
                  />
                </Form.Group>
                <Row>
                  <Col>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput2"
                    >
                      <Form.Label>
                        Added Date <span className="text-danger">*</span>
                      </Form.Label>
                      <br />
                      <DatePicker
                        placeholderText="Select Added Date"
                        selected={selectedAddedDate}
                        onChange={(date) => setValue("added_date", date)} // Use 'date' directly
                        onSelect={(date) => setSelectedAddedDate(date)}
                        dateFormat="yyyy-MM-dd"
                        className="form-control"
                        name="selectedAddedDate"
                        value={watch("selectedAddedDate")}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput2"
                    >
                      <Form.Label>
                        Expire Date <span className="text-danger">*</span>
                      </Form.Label>
                      <br />
                      <DatePicker
                        placeholderText="Select Expire Date"
                        selected={selectedExpireDate}
                        onChange={(date) => setValue("expire_date", date)} // Use 'date' directly
                        onSelect={(date) => setSelectedExpireDate(date)}
                        dateFormat="yyyy-MM-dd"
                        className="form-control"
                        name="selectedExpireDate"
                        value={watch("setSelectedExpireDate")}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button
                variant="primary"
                onClick={handleSubmit((data) => {
                  console.log(data);
                  addProduct(data);
                  handleClose(); // Move handleClose to onSubmit handler
                })}
              >
                Add Product
              </Button>
            </Modal.Footer>
          </Modal>
          <div style={{ padding: "30px" }}>
            <center>
              <Row style={{ padding: "20px" }}>
                <Col>
                  <Form className="d-flex">
                    <Form.Control
                      type="search"
                      placeholder="Search..."
                      className="me-2"
                      aria-label="Search"
                      style={{ width: "400px", marginLeft: "400px" }}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </Form>
                </Col>
                <Col>
                  <Button
                    style={{
                      backgroundColor: "black",
                      borderColor: "black",
                    }}
                    onClick={handleShow}
                  >
                    Add Product
                  </Button>
                </Col>
                <Col>
                  <Button
                    style={{
                      backgroundColor: "black",
                      borderColor: "black",
                    }}
                    onClick={downloadPdfReport}
                  >
                    Generate Report
                  </Button>
                </Col>
              </Row>
            </center>
            <br />
            <br />
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Product ID</th>
                  <th>Image</th>
                  <th>Product Name</th>
                  <th>Product Description</th>
                  <th>Category</th>
                  <th>Actual Price</th>
                  <th>Selling Price</th>
                  <th>Quantity</th>
                  <th>Added Date</th>
                  <th>Expire Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data
                  .filter((member) =>
                    Object.values(member).some((value) =>
                      value
                        .toString()
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase())
                    )
                  )
                  .map((member) => (
                    <tr key={member.cusProductID}>
                      <td onClick={() => handleRowClick(member)}>
                        {member.cusProductID}
                      </td>
                      <td onClick={() => handleRowClick(member)}>
                        <div
                          style={{
                            width: "100px",
                            height: "50px",
                            backgroundSize: "cover",
                            backgroundImage: `url(${member.productImage})`,
                          }}
                        />
                      </td>
                      <td>{member.name}</td>
                      <td>{member.description}</td>
                      <td>{member.category}</td>
                      <td>Rs. {member.actualPrice}</td>
                      <td>Rs. {member.sellingPrice}</td>
                      <td>{member.quantity}</td>
                      <td>
                        {new Date(member.added_date).toLocaleDateString()}
                      </td>
                      <td>
                        {new Date(member.expire_date).toLocaleDateString()}
                      </td>
                      <td>
                        <EditLineIcon
                          onClick={() => {
                            editProductForm.reset({
                              _id: member._id,
                              name: member.name,
                              description: member.description,
                              category: member.category,
                              actualPrice: member.actualPrice,
                              sellingPrice: member.sellingPrice,
                              quantity: member.quantity,
                              added_date: member.added_date,
                              expire_date: member.expire_date,
                            });
                            setShowEdit(true);
                          }}
                        />
                        <DeleteBinLineIcon
                          onClick={() => {
                            handleDelete(member._id);
                          }}
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
          {selectedProduct && (
            <Modal
              size="lg"
              show={showDetail}
              onHide={() => setShowDetail(false)}
              centered
            >
              <center>
                <Modal.Header closeButton>
                  <Modal.Title>Product Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Card.Img
                    variant="top"
                    src={selectedProduct.productImage}
                    style={{
                      width: "80%",
                      height: "280px",
                      borderRadius: "10px",
                    }}
                  />
                  <br />
                  <br />
                  <p>
                    <strong>Product ID:</strong> {selectedProduct.cusProductID}
                  </p>
                  <p>
                    <strong>Product Name:</strong> {selectedProduct.name}
                  </p>
                  <p>
                    <strong>Actual Price:</strong> Rs.{" "}
                    {selectedProduct.actualPrice}
                  </p>
                  <p>
                    <strong>Selling Price:</strong> Rs.{" "}
                    {selectedProduct.sellingPrice}
                  </p>
                </Modal.Body>
              </center>
            </Modal>
          )}
          {/* delete product model */}
          <Modal show={showDelete} onHide={handleCloseDelete}>
            <Modal.Header closeButton>
              <Modal.Title>Delete Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure!</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseDelete}>
                Close
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  deleteProduct(deleteID);
                }}
              >
                Yes
              </Button>
            </Modal.Footer>
          </Modal>
          {/* edit product model */}
          <Modal show={showEdit} onHide={handleCloseEdit}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Label>Product Image</Form.Label>
                  <Form.Control
                    type="file"
                    onChange={(e) => handleImageUpload(e)}
                    accept="image/*"
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Product Name</Form.Label>
                  <Form.Control
                    type="name"
                    {...editProductForm.register("name")}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Product Description</Form.Label>
                  <Form.Control
                    type="text"
                    {...editProductForm.register("description")}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    as="select"
                    {...editProductForm.register("category", {
                      required: true,
                    })}
                  >
                    <option value="">Select Category</option>
                    <option value="Fashion and Apparel">
                      Fashion and Apparel
                    </option>
                    <option value="Electronics and Technology">
                      Electronics and Technology
                    </option>
                    <option value="Home and Furniture">
                      Home and Furniture
                    </option>
                    <option value="Health and Beauty">Health and Beauty</option>
                    <option value="Food and Dining">Food and Dining</option>
                    <option value="Entertainment and Leisure">
                      Entertainment and Leisure
                    </option>
                    <option value="Jewelry and Watches">
                      Jewelry and Watches
                    </option>

                    <option value="Other">Other</option>
                  </Form.Control>
                  {errors.country && (
                    <span className="text-danger">This is required.</span>
                  )}
                  <br />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Actual Price</Form.Label>
                  <Form.Control
                    type="number"
                    {...editProductForm.register("actualPrice", {
                      required: true,
                    })}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Selling Price</Form.Label>
                  <Form.Control
                    type="number"
                    {...editProductForm.register("sellingPrice", {
                      required: true,
                    })}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control
                    type="number"
                    {...editProductForm.register("quantity", {
                      required: true,
                    })}
                  />
                </Form.Group>
                <Row>
                  <Col>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput2"
                    >
                      <Form.Label>
                        Added Date <span className="text-danger">*</span>
                      </Form.Label>
                      <br />
                      <DatePicker
                        selected={editProductForm.watch("added_date")} // Use watch to get the current value
                        onChange={(date) =>
                          editProductForm.setValue("added_date", date)
                        } // Manually update the form value
                        onSelect={(date) => setSelectedAddedDate(date)} // Update selectedAddedDate state if needed
                        dateFormat="yyyy-MM-dd"
                        className="form-control"
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    {" "}
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput2"
                    >
                      <Form.Label>
                        Expire Date <span className="text-danger">*</span>
                      </Form.Label>
                      <br />
                      <DatePicker
                        selected={editProductForm.watch("expire_date")} // Use watch to get the current value
                        onChange={(date) =>
                          editProductForm.setValue("expire_date", date)
                        } // Manually update the form value
                        onSelect={(date) => setSelectedExpireDate(date)} // Update selectedAddedDate state if needed
                        dateFormat="yyyy-MM-dd"
                        className="form-control"
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseEdit}>
                Close
              </Button>
              <Button variant="primary" onClick={() => editProduct()}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </center>
    </>
  );
}

export default Inventory;
