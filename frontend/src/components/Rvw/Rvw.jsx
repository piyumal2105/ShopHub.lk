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
      rating: "",
      review: "",
      
    },
  });

  const editRvwForm = useForm({
    validateInputChanges: true,
    initialValues: {
      _id: "",
      rating: "",
      review: "",
      
    },
  });


  //use react query and fetch rvw data
  const { data, isLoading, isError, refetch } = useQuery(
    "acceptedMemberData",
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

  const filteredData = data.filter((member) =>
    Object.values(member).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <>
      <center>
        <div>
          <SideNavbar />
          <br></br>
          <h2>RVWs</h2>
            <br></br>
             
         
          <Modal show={show} onHide={handleClose }size="lg">
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
                    Rating <span className="text-danger">*</span>
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
              <Row style={{ padding: "20px" }}>
                <Col>
                  <Form className="d-flex">
                    <Form.Control
                      type="search"
                      placeholder="Search by RVW ID"
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
              </Row>
            </center>

            <Container>
  <Row className="justify-content-md-center">
    <Col md={10} style={{ maxWidth: "1800px" }}>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Rating</th>
            <th>Review</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((member) => (
            <tr key={member._id}>
              <td>{member.rating}</td>
              <td>{member.review}</td>
              <td>
               <EditLineIcon
  onClick={() => {
    editRvwForm.reset({
      _id: member._id,
      rating: member.rating,
      review: member.review,
    });
    setShowEdit(true);
  }}
  style={{ color: 'blue', cursor: 'pointer' }} // Adjust color and other styles as needed
/>
<DeleteBinLineIcon
  onClick={() => {
    handleDelete(member._id);
  }}
  style={{ color: 'red', cursor: 'pointer' }} // Adjust color and other styles as needed
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
                  <Form.Label>Rvw Rating</Form.Label>
                  <Form.Control
                    type="name"
                  
                    {...editRvwForm.register("rating", {
                     
                    })}
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
    </>
  );
}

export default Rvw;