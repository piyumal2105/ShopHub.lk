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
import SideNavbar from "../AdminDashboard/SideNavbar";
import { Col, Row } from "react-bootstrap";
import { FileInput, Select, TextInput, Textarea } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller } from "react-hook-form";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function AdminEvent() {
    const [show, setShow] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [deleteID, setDeleteID] = useState("");
    const [showEdit, setShowEdit] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedAddedDate, setSelectedAddedDate] = useState(null);
    const [selectedExpireDate, setSelectedExpireDate] = useState(null);
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
        eventTitle: "",
        description: "",
        startDate: "",
        
        
      },
    });
  
    const editEventForm = useForm({
      validateInputChanges: true,
      initialValues: {
        _id: "",
        eventTitle: "",
        description: "",
        startDate: "",
        
        
      },
    });
  
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };
  
    //use react query and fetch member data
    const { data, isLoading, isError, refetch } = useQuery(
      "acceptedMemberData",
      async () => {
        const response = await axios.get("http://localhost:3001/event");
        return response.data;
      }
    );
  
    if (isLoading) {
      return <p>Loading...</p>;
    }
  
    if (isError) {
      return <p>Error loading data</p>;
    }
  
    const editEvent = async () => {
      try {
        const editEventDetails = editEventForm.getValues();
        console.log(editEventDetails);
        await axios.put(
          `http://localhost:3001/event/updateEvent/${editEventDetails._id}`,
          editEventDetails
        );
  
        editEventForm.reset();
        setShowEdit(false);
        Swal.fire({
          icon: "success",
          title: "Event Update Successfully",
          text: "You have successfully update a event",
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
  
    const addEvent = async (formData) => {
      try {
        console.log(formData);
        await axios.post(
          "http://localhost:3001/event/addEvent",
          formData
        );
  
        reset();
        Swal.fire({
          icon: "success",
          title: "Event Added ",
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
  
    const deleteEvent = async (_id) => {
      try {
        await axios.delete(
          `http://localhost:3001/event/deleteEvent/${_id}`,
          {
            withCredentials: true,
          }
        );
        Swal.fire({
          title: "Deleted!",
          text: "Event Deleted.",
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
      editEventForm.reset(); // Reset the form
    };
  
    const handleShowEdit = () => setShowEdit(true);
  
    const filteredData = data.filter((member) =>
      Object.values(member).some((value) =>
        value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    const handleChange = (e) => {
      console.log(e);
    };
    const downloadPdfReport = () => {
      const doc = new jsPDF();
      autoTable(doc, {
        theme: "striped",
        head: [
          [
            "Event ID",
            "Event Titlee",
            "Description",
            "Date",
            
          ],
        ],
        body: data.map((item) => [
          item.eventId,
          item.eventTitle,
          item.description,
          new Date(item.startDate).toLocaleDateString(),
          
        ]),
        columnStyles: { 0: { cellWidth: "auto" } },
      });
      doc.save("Events_report.pdf");
    };
    return(
   
       <center>
         <div>
         <SideNavbar />
          <Modal show={show} onHide={handleClose} size="lg">
            {/* <Modal.Header closeButton>
  
            </Modal.Header> */}
            <Modal.Body>
              <div className="p-3 max-w-3xl mx-auto min-h-screen">
                <h2 className="text-center text3-xl my-7 font semibold">
                  Create an Event
                </h2>
                <form className=" flex flex-col gap-4">
                  <div className="flex flex-col gap-4 sm:flex-row justify-between ">
                    <Row style={{ paddingBottom: "10px" }}>
                      <Col>
                        <TextInput
                          type="text"
                          placeholder="Event Title"
                          id="eventTitle"
                          className="flex-1"
                          style={{ width: "500px" }}
                          {...register("eventTitle", { required: true })}
                        />
                      </Col>
                      
                    </Row>
                  </div>
                  <Row style={{ paddingBottom: "10px" }}>
                    {/* <div
                      style={{ border: "3px dotted #0E86D4", padding: "10px" }}
                    >
                      <div className="mb-3">
                        <label htmlFor="formFileSm" className="form-label">
                          Add a Image file
                        </label>
                        <input
                          className="form-control form-control-sm"
                          id="formFileSm"
                          type="file"
                          
                        />
                      </div>
                    </div> */}
                   
                  
                    {/* <Textarea
                    type="text"
                    placeholder="Description"
                    id="descriptione"
                    className="flex-1"
                    style={{ width: "500px" }}
                    {...register("description", { required: true })}
                  /> */}

                    {/* <Controller
                      name="description"
                      control={editPromotionForm.control}
                      render={({ field }) => (
                        <ReactQuill
                          theme="snow"
                          placeholder="Add Description.."
                          className="h-72 mb-12"
                          value={field.value}
                          onChange={field.onChange}
                        />
                      )} */}
                    {/* /> */}
                    {/* <ReactQuill
                      theme="snow"
                      placeholder="Add Description.."
                      className="h-72 mb-12"
                     
                      onChange={handleChange }
                       {...register("description", { required: true })}
                    /> */}
                     <Col>
                      <label>Description</label>
                      <TextInput
                        type="text"
                        required
                        id="description"
                        className="flex-1"
                        style={{ width: "650px", height: "120px" }}
                        {...register("description", { required: true })}
                      />
                    </Col>
                    </Row>
                  
                  <br />
                  <br />
                  <br />
                  <Row>
                    
                    <Form.Label column sm="2">
                      Date <span className="text-danger">*</span>
                    </Form.Label>
                    <Col>
                      <DatePicker
                        placeholderText="Select"
                        selected={selectedAddedDate}
                        onChange={(date) => setValue("startDate", date)} // Use 'date' directly
                        onSelect={(date) => setSelectedAddedDate(date)}
                        dateFormat="yyyy-MM-dd"
                        className="form-control"
                        name="selectedAddedDate"
                        value={watch("selectedAddedDate")}
                        // {...register("selectedAddedDate", {
                        //   //   required: true,
                        // })}
                      />
                    </Col>
                    
                    
                    
                  </Row>
                  <br />
                  
                </form>
              </div>
            </Modal.Body>
            <br />

            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={handleClose}
                style={{ width: "1100px" }}
              >
                Close
              </Button>
              <Button
                style={{ width: "1100px" }}
                variant="primary"
                onClick={handleSubmit((data) => {
                  console.log(data);
                  addEvent(data);
                  handleClose(); // Move handleClose to onSubmit handler
                })}
                className="gradient-background" // Apply the gradient background style
              >
                Add Event
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
                      placeholder="Search here..."
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
                    className="gradient-background"
                  >
                    Add Event
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

            <Table
              style={{ marginLeft: "270px", width: "1100px" }}
              striped
              bordered
              hover
            >
              <thead>
                <tr>
                  <th>Event ID</th>
                  <th>Event Title</th>
                  <th>Description</th>
                  <th>Date</th>
                  
                  <th></th>
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
                    <tr key={member.eventId}>
                      <td>{member.eventId}</td>
                      <td>{member.eventTitle}</td>
                      <td>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: member.description,
                          }}
                        />
                      </td>
                      <td>{new Date(member.startDate).toLocaleDateString()}</td>
                      
                      <td>
                        <EditLineIcon
                          onClick={() => {
                            editEventForm.reset({
                              _id: member._id,
                              eventTitle: member.eventTitle, 
                              description: member.description,
                              startDate: member.startDate,
                              
                              
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
          <Modal show={showDelete} onHide={handleCloseDelete}>
            <Modal.Header closeButton>
              <Modal.Title>Delete Event</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure!</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseDelete}>
                Close
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  deleteEvent(deleteID);
                }}
              >
                Yes
              </Button>
            </Modal.Footer>
          </Modal>
          <Modal show={showEdit} onHide={handleCloseEdit} size="lg">
            <Modal.Header closeButton>
              <Modal.Title>Edit Event Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Row>
                  <Col>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>Event Title</Form.Label>
                      <Form.Control
                        type="name"
                        {...editEventForm.register("eventTitle", {})}
                      />
                    </Form.Group>
                  </Col>
                 
                </Row>
                
                {/* <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label> Description</Form.Label>
                  <Form.Control
                    type="text"
                    {...editPromotionForm.register("description", {
                      required: true,
                    })}
                  ></Form.Control>

                  <br />
                  </Form.Group> */}
                  
                  <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    style={{ width: "600px", height: "120px" }}
                    {...editEventForm.register("description")}
                  />
                </Form.Group>
                <br />
               
                <Row>
                  <Col>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput2"
                    >
                      <Form.Label>
                         Date <span className="text-danger">*</span>
                      </Form.Label>
                      <br />

                      <DatePicker
                        selected={editEventForm.watch("startDate")} // Use watch to get the current value
                        onChange={(date) =>
                          editEventForm.setValue("startDate", date)
                        } // Manually update the form value
                        onSelect={(date) => setSelectedAddedDate(date)} // Update selectedAddedDate state if needed
                        dateFormat="yyyy-MM-dd"
                        className="form-control"
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput2"
                    >
                      
                      <br />

                      
                    </Form.Group>
                  </Col>
                </Row>
                
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={handleCloseEdit}
                style={{ width: "1100px" }}
              >
                Close
              </Button>
              <Button
                variant="primary"
                onClick={() => editEvent()}
                style={{ width: "1100px" }}
                className="gradient-background"
              >
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>

        {/* <Table
              style={{ marginLeft: "270px", width: "1100px" }}
              striped
              bordered
              hover
            >
              <thead>
                <tr>
                  <th>Event ID</th>
                  <th>Event Title</th>
                  <th>Description</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th></th>
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
                    <tr key={member.eventId}>
                      <td>{member.eventId}</td>
                      <td>{member.eventTitle}</td>
                      <td>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: member.description,
                          }}
                        />
                      </td>
                      <td>{new Date(member.startDate).toLocaleDateString()}</td>
                      <td>{new Date(member.endDate).toLocaleDateString()}</td>
                    
                      <td>
                        <EditLineIcon
                          onClick={() => {
                            editEventForm.reset({
                              _id: member._id,
                              eventTitle: member.eventTitle, 
                              description: member.description,
                              startDate: member.startDate,
                              endDate: member.endDate,
                              
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
            </Table> */}
            </div>
            </center>
    );
}
export default AdminEvent;