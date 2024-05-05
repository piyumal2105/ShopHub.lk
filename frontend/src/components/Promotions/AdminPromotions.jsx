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
import "./Promotions.css";

function AdminPromotion() {
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
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
      promotionTitle: "",
      promotionType: "",
      image:"",
      description: "",
      startDate: "",
      endDate: "",
      termsNconditions: "",
    },
  });

  const editPromotionForm = useForm({
    validateInputChanges: true,
    initialValues: {
      _id: "",
      promotionTitle: "",
      promotionType: "",
      image:"",
      description: "",
      startDate: "",
      endDate: "",
      termsNconditions: "",
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
      const response = await axios.get("http://localhost:3001/promotion");
      return response.data;
    }
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error loading data</p>;
  }

  const editPromotion = async () => {
    try {
      const editPromotionDetails = editPromotionForm.getValues();
      console.log(editPromotionDetails);
      await axios.put(
        `http://localhost:3001/promotion/updatePromotion/${editPromotionDetails._id}`,
        editPromotionDetails
      );

      editPromotionForm.reset();
      setShowEdit(false);
      Swal.fire({
        icon: "success",
        title: "Promotion Update Successfully",
        text: "You have successfully update a promotion",
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

  const addPromotion = async (formData) => {
    try {
      console.log(formData);
      await axios.post(
        "http://localhost:3001/promotion/addPromotion",
        formData
      );

      reset();
      Swal.fire({
        icon: "success",
        title: "Promotion Added ",
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

  const deletePromotion = async (_id) => {
    try {
      await axios.delete(
        `http://localhost:3001/promotion/deletePromotion/${_id}`,
        {
          withCredentials: true,
        }
      );
      Swal.fire({
        title: "Deleted!",
        text: "Promotion Deleted.",
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
    editPromotionForm.reset(); // Reset the form
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
  // Image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      // `reader.result` contains the base64 encoded image data
      setValue("image", reader.result); // Store base64 data in form state
      editPromotionForm.setValue("image", reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
      const imageUrl = URL.createObjectURL(file);
      setImagePreviewUrl(imageUrl); // Convert image to base64 string
    }
  };
  



  return (
    <>
      <center>
        <div>
          <SideNavbar />
          <Modal show={show} onHide={handleClose} size="lg">
            {/* <Modal.Header closeButton>
  
            </Modal.Header> */}
            <Modal.Body>
              <div className="p-3 max-w-3xl mx-auto min-h-screen">
                <h2 className="text-center text3-xl my-7 font semibold">
                  Create a Promotion
                </h2>
                <form className=" flex flex-col gap-4">
                  <div className="flex flex-col gap-4 sm:flex-row justify-between ">
                    <Row style={{ paddingBottom: "10px" }}>
                      <Col>
                        <TextInput
                          type="text"
                          placeholder="Promotion Title"
                          id="promotionTitle"
                          className="flex-1"
                          style={{ width: "500px" }}
                          {...register("promotionTitle", { required: true })}
                        />
                      </Col>
                      <Col>
                        <Select
                          {...register("promotionType", { required: true })}
                        >
                          <option value="uncategorized">Select a Type</option>
                          <option value="Card Offer">Card Offer</option>
                          <option value="Free Shipping">Free Shipping</option>
                          <option value="Bundle Offer">Bundle Promotion</option>
                          <option value="Other">Other Promotion</option>
                        </Select>
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
                    <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label> Image</Form.Label>
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
                  </Row>
                  <Row>
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
                    <ReactQuill
                      theme="snow"
                      placeholder="Add Description.."
                      className="h-72 mb-12"
                      value={watch("description")} // Use watch to get the current value
                      onChange={(value) => setValue("description", value)} // Manually update the form value
                    />
                  </Row>
                  <br />
                  <br />
                  <br />
                  <Row>
                    <Form.Label column sm="2">
                      Start Date <span className="text-danger">*</span>
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
                    <Form.Label column sm="2">
                      End Date <span className="text-danger">*</span>
                    </Form.Label>
                    <Col>
                      <DatePicker
                        placeholderText="Select End Date"
                        selected={selectedExpireDate}
                        onChange={(date) => setValue("endDate", date)} // Use 'date' directly
                        onSelect={(date) => setSelectedExpireDate(date)}
                        dateFormat="yyyy-MM-dd"
                        className="form-control"
                        value={watch("selectedExpireDate")}
                        minDate={selectedAddedDate ? new Date(selectedAddedDate.getTime() + 24 * 60 * 60 * 1000) : null} // Add 1 day to the selectedAddedDate
                        // {...register("endDate", {
                        //   //   required: true,
                        // })}
                      />
                    </Col>
                  </Row>
                  <br />
                  <Row>
                    <Col>
                      <label>Terms & Conditions</label>
                      <TextInput
                        type="text"
                        required
                        id="termsNconditions"
                        className="flex-1"
                        style={{ width: "500px", height: "100px" }}
                        {...register("termsNconditions", { required: true })}
                      />
                    </Col>
                  </Row>
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
                  addPromotion(data);
                  handleClose(); // Move handleClose to onSubmit handler
                })}
                className="gradient-background" // Apply the gradient background style
              >
                Add Promotion
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
                    Add Promotion
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
                  <th>Promotion ID</th>
                  <th>Promotion Title</th>
                  <th>Promotion Type</th>
                  <th>Image</th>
                  <th>Description</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Terms & Conditions</th>
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
                    <tr key={member.promotionId}>
                      <td>{member.promotionId}</td>
                      <td>{member.promotionTitle}</td>
                      <td>{member.promotionType}</td>
                      <td><div
                        // onClick={() => handleRowClick(member)}
                        style={{
                          width: "100px",
                          height: "50px",
                          alignItems: "center",
                          backgroundSize: "cover",
                          backgroundImage: `url(${member.image})`,
                        }}
                      /></td>
                      <td>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: member.description,
                          }}
                        />
                      </td>
                      <td>{new Date(member.startDate).toLocaleDateString()}</td>
                      <td>{new Date(member.endDate).toLocaleDateString()}</td>
                      <td>{member.termsNconditions}</td>
                      <td>
                        <EditLineIcon
                          onClick={() => {
                            editPromotionForm.reset({
                              _id: member._id,
                              promotionTitle: member.promotionTitle,
                              promotionType: member.promotionType,
                              image:member.image,
                              description: member.description,
                              startDate: member.startDate,
                              endDate: member.endDate,
                              termsNconditions: member.termsNconditions,
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
              <Modal.Title>Delete Member</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure!</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseDelete}>
                Close
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  deletePromotion(deleteID);
                }}
              >
                Yes
              </Button>
            </Modal.Footer>
          </Modal>
          <Modal show={showEdit} onHide={handleCloseEdit} size="lg">
            <Modal.Header closeButton>
              <Modal.Title>Edit Promotion Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Row>
                  <Col>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>Promotion Title</Form.Label>
                      <Form.Control
                        type="name"
                        {...editPromotionForm.register("promotionTitle", {})}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>Promotion Type</Form.Label>
                      <Form.Control
                        as="select"
                        {...editPromotionForm.register("promotionType")}
                      >
                        <option value="uncategorized">Select a Type</option>
                        <option value="Card Offer">Card Offer</option>
                        <option value="Free Shipping">Free Shipping</option>
                        <option value="Bundle Offer">Bundle Promotion</option>
                        <option value="Other">Other Promotion</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                <Form.Group controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Image</Form.Label>
                  <Form.Control
                  
                    type="file"
                    onChange={(e) => handleImageUpload(e)}
                    accept="image/*"
                  />
                  {
                    <img
                      src={editPromotionForm.watch("image")}
                      alt="Base64 Image"
                      style={{
                        width: "150px",
                        height: "100px",
                        marginTop: "10px",
                      }}
                    />
                  }
                </Form.Group>
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
                <ReactQuill
                  theme="snow"
                  placeholder="Add Description.."
                  className="h-72 mb-12"
                  value={editPromotionForm.watch("description")} // Use watch to get the current value
                  onChange={(value) =>
                    editPromotionForm.setValue("description", value)
                  } // Manually update the form value
                />
                <br />
                <Row>
                  <Col>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput2"
                    >
                      <Form.Label>
                        Start Date <span className="text-danger">*</span>
                      </Form.Label>
                      <br />

                      <DatePicker
                        selected={editPromotionForm.watch("startDate")} // Use watch to get the current value
                        onChange={(date) =>
                          editPromotionForm.setValue("startDate", date)
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
                      <Form.Label>
                        End Date <span className="text-danger">*</span>
                      </Form.Label>
                      <br />

                      <DatePicker
                        selected={editPromotionForm.watch("endDate")} // Use watch to get the current value
                        onChange={(date) =>
                          editPromotionForm.setValue("endDate", date)
                        } // Manually update the form value
                        onSelect={(date) => setSelectedExpireDate(date)} // Update selectedAddedDate state if needed
                        dateFormat="yyyy-MM-dd"
                        className="form-control"
                        minDate={selectedAddedDate ? new Date(selectedAddedDate.getTime() + 24 * 60 * 60 * 1000) : null} // Add 1 day to the selectedAddedDate
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Terms & Conditions</Form.Label>
                  <Form.Control
                    type="text"
                    style={{ width: "600px", height: "100px" }}
                    {...editPromotionForm.register("termsNconditions")}
                  />
                </Form.Group>
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
                onClick={() => editPromotion()}
                style={{ width: "1100px" }}
                className="gradient-background"
              >
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </center>
    </>
  );
}

export default AdminPromotion;
