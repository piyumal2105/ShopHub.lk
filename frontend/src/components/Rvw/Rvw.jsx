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
import SideNavbar from "../AdminDashboard/SideNavbar";
//import "primereact/resources/themes/saga-blue/theme.css";
import { Col, Container, Row } from "react-bootstrap";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Grid } from "@mui/material";

function Rvw() {
  const [show, setShow] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteID, setDeleteID] = useState("");
  const [showEdit, setShowEdit] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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
      code: "",
      rating: "",
      review: "",
    },
  });

  const editRvwForm = useForm({
    validateInputChanges: true,
    initialValues: {
      _id: "",
      code: "",
      rating: "",
      review: "",
    },
  });

  //use react query and fetch rvw data
  const { data, isLoading, isError, refetch } = useQuery(
    "acceptedReviewData",
    async () => {
      const response = await axios.get("http://localhost:3001/rvw/rvws/getall");
      return response.data;
    }
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error loading data</p>;
  }

  const editRvw = async () => {
    try {
      const editRvwDetails = editRvwForm.getValues();
      await axios.put(
        `http://localhost:3001/rvw/rvws/updatervw/${editRvwDetails._id}`,
        editRvwDetails
      );
      editRvwForm.reset();
      setShowEdit(false);
      Swal.fire({
        icon: "success",
        title: "Rvw Update Successfully",
        text: "You have successfully update a rvw",
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

  const addRvw = async (formData) => {
    try {
      console.log(formData);
      await axios.post("http://localhost:3001/rvw/rvws/create", formData);

      reset();
      Swal.fire({
        icon: "success",
        title: "Rvw Added Successfully",
        text: "You have successfully added a rvw",
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

  const deleteRvw = async (_id) => {
    try {
      await axios.delete(`http://localhost:3001/rvw/rvws/deletervw/${_id}`, {
        withCredentials: true,
      });
      Swal.fire({
        title: "Deleted!",
        text: "Rvw has been deleted.",
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
    editRvwForm.reset(); // Reset the form
  };

  const handleShowEdit = () => setShowEdit(true);

  const filteredData = data.filter((review) =>
    Object.values(review).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const downloadPdfReport = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      theme: "striped",
      head: [["code", "rating", "review"]],
      body: data.map((item) => [item.code, item.rating, item.review]),
      columnStyles: { 0: { cellWidth: "auto" } },
    });
    doc.save("Review Report.pdf");
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <SideNavbar />
        </Grid>
        <Grid item xs={9}>
          <center>
            <div>
              <br></br>
              <h2>Shop Reviews</h2>
              <br></br>

              <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                  <Modal.Title>Add Rvws</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>
                        Shop Code <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        type="number"
                        {...register("code", {
                          required: true,
                        })}
                      />
                    </Form.Group>

                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>
                        Shop Name <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        {...register("rating", {
                          required: true,
                        })}
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>
                        Review <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        {...register("review", {
                          required: true,
                        })}
                      />
                    </Form.Group>
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
                      addRvw(data);
                      handleClose(); // Move handleClose to onSubmit handler
                    })}
                  >
                    Add Rvw
                  </Button>
                </Modal.Footer>
              </Modal>
              <div style={{ padding: "30px" }}>
                <center>
                  <Row style={{ padding: "20px", marginLeft: "-400px" }}>
                    <Col>
                      <Form className="d-flex">
                        <Form.Control
                          type="search"
                          placeholder="Search by Shop Name"
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
                          borderBlockColor: "black",
                        }}
                        onClick={handleShow}
                      >
                        Add Rvw
                      </Button>
                    </Col>
                    <Col>
                      <Button
                        style={{
                          backgroundColor: "black",
                          borderBlockColor: "black",
                        }}
                        onClick={downloadPdfReport}
                      >
                        Download Report
                      </Button>
                    </Col>
                  </Row>
                </center>

                <Container>
                  <Row className="justify-content-md-center">
                    <Col
                      md={10}
                      style={{ width: "90rem", marginLeft: "-200px" }}
                    >
                      <Table striped bordered hover>
                        <thead>
                          <tr>
                            <th>Shop Code</th>
                            <th>Shop Name</th>
                            <th>Review</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredData.map((review) => (
                            <tr key={review._id}>
                              <td>{review.code}</td>
                              <td>{review.rating}</td>
                              <td>{review.review}</td>
                              <td>
                                <EditLineIcon
                                  onClick={() => {
                                    editRvwForm.reset({
                                      _id: review._id,
                                      code: review.code,
                                      rating: review.rating,
                                      review: review.review,
                                    });
                                    setShowEdit(true);
                                  }}
                                  style={{ color: "blue", cursor: "pointer" }} // Adjust color and other styles as needed
                                />
                                <DeleteBinLineIcon
                                  onClick={() => {
                                    handleDelete(review._id);
                                  }}
                                  style={{ color: "red", cursor: "pointer" }} // Adjust color and other styles as needed
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </Col>
                  </Row>
                </Container>
              </div>
              <Modal show={showDelete} onHide={handleCloseDelete}>
                <Modal.Header closeButton>
                  <Modal.Title>Delete Rvw</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure!</Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleCloseDelete}>
                    Close
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => {
                      deleteRvw(deleteID);
                    }}
                  >
                    Yes
                  </Button>
                </Modal.Footer>
              </Modal>
              <Modal show={showEdit} onHide={handleCloseEdit}>
                <Modal.Header closeButton>
                  <Modal.Title>Edit Rvw</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>Shop Code</Form.Label>
                      <Form.Control
                        type="name"
                        {...editRvwForm.register("code", {})}
                      />
                    </Form.Group>

                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>Shop Name</Form.Label>
                      <Form.Control
                        type="name"
                        {...editRvwForm.register("rating", {})}
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>Rvw Review</Form.Label>
                      <Form.Control
                        type="text"
                        {...editRvwForm.register("review")}
                      />
                    </Form.Group>

                    {errors.country && (
                      <span className="text-danger">This is required.</span>
                    )}
                    <br />
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleCloseEdit}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={() => editRvw()}>
                    Save Changes
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </center>
        </Grid>
      </Grid>
    </>
  );
}

export default Rvw;
