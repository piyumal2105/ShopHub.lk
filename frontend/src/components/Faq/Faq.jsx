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

function Faq() {
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
      question_no: "",
      question: "",
      answer: "",
    },
  });

  const editFaqForm = useForm({
    validateInputChanges: true,
    initialValues: {
      _id: "",
      question_no: "",
      question: "",
      answer: "",
    },
  });

  //use react query and fetch faq data
  const { data, isLoading, isError, refetch } = useQuery(
    "acceptedFaData",
    async () => {
      const response = await axios.get("http://localhost:3001/faq/faqs/getall");
      return response.data;
    }
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error loading data</p>;
  }

  const editFaq = async () => {
    try {
      const editFaqDetails = editFaqForm.getValues();
      await axios.put(
        `http://localhost:3001/faq/faqs/updatefaq/${editFaqDetails._id}`,
        editFaqDetails
      );
      editFaqForm.reset();
      setShowEdit(false);
      Swal.fire({
        icon: "success",
        title: "Faq Update Successfully",
        text: "You have successfully update a faq",
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

  const addFaq = async (formData) => {
    try {
      console.log(formData);
      await axios.post("http://localhost:3001/faq/faqs/create", formData);

      reset();
      Swal.fire({
        icon: "success",
        title: "Faq Added Successfully",
        text: "You have successfully added a faq",
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

  const deleteFaq = async (_id) => {
    try {
      await axios.delete(`http://localhost:3001/faq/faqs/deletefaq/${_id}`, {
        withCredentials: true,
      });
      Swal.fire({
        title: "Deleted!",
        text: "Faq has been deleted.",
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
    editFaqForm.reset(); // Reset the form
  };

  const handleShowEdit = () => setShowEdit(true);

  const filteredData = data.filter((fa) =>
    Object.values(fa).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const downloadPdfReport = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      theme: "striped",
      head: [["Question No", "Question", "Answer"]],
      body: data.map((item) => [item.question_no, item.question, item.answer]),
      columnStyles: { 0: { cellWidth: "auto" } },
    });
    doc.save("FAQ Report.pdf");
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
              <h2>FAQs</h2>
              <br></br>

              <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                  <Modal.Title>Add Faqs</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>
                        Question_No <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text" // Change type to text
                        pattern="[0-9]*" // Regular expression to allow only numbers
                        {...register("question_no", {
                          required: true,
                          pattern: {
                            value: /^[0-9]+$/,
                            message: "Please enter only numbers.",
                          },
                        })}
                      />
                      <Form.Text className="text-muted">
                        Please enter only numbers.
                      </Form.Text>
                    </Form.Group>

                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>
                        Question <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        {...register("question", {
                          required: true,
                        })}
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>
                        Answer <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        {...register("answer", {
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
                      addFaq(data);
                      handleClose(); // Move handleClose to onSubmit handler
                    })}
                  >
                    Add Faq
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
                          placeholder="Search by FAQ ID"
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
                        Add Faq
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
                <br />
                <br />

                <Container style={{ marginLeft: "-100px" }}>
                  <Row className="justify-content-md-center">
                    <Col md={10} style={{ width: "80rem" }}>
                      <Table striped bordered hover>
                        <thead>
                          <tr>
                            <th>Question No</th>
                            <th>Question</th>
                            <th>Answer</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredData.map((fa) => (
                            <tr key={fa._id}>
                              <td>{fa.question_no}</td>
                              <td>{fa.question}</td>
                              <td>{fa.answer}</td>
                              <td>
                                <EditLineIcon
                                  onClick={() => {
                                    editFaqForm.reset({
                                      _id: fa._id,
                                      question_no: fa.question_no,
                                      question: fa.question,
                                      answer: fa.answer,
                                    });
                                    setShowEdit(true);
                                  }}
                                  style={{ color: "blue", cursor: "pointer" }} // Adjust color and other styles as needed
                                />
                                <DeleteBinLineIcon
                                  onClick={() => {
                                    handleDelete(fa._id);
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
                  <Modal.Title>Delete Faq</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure!</Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleCloseDelete}>
                    Close
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => {
                      deleteFaq(deleteID);
                    }}
                  >
                    Yes
                  </Button>
                </Modal.Footer>
              </Modal>
              <Modal show={showEdit} onHide={handleCloseEdit}>
                <Modal.Header closeButton>
                  <Modal.Title>Edit Faq</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>Qustion No</Form.Label>
                      <Form.Control
                        type="number"
                        {...editFaqForm.register("question_no")}
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>Faq Question</Form.Label>
                      <Form.Control
                        type="name"
                        {...editFaqForm.register("question", {})}
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>Faq Answer</Form.Label>
                      <Form.Control
                        type="text"
                        {...editFaqForm.register("answer")}
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
                  <Button variant="primary" onClick={() => editFaq()}>
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

export default Faq;
