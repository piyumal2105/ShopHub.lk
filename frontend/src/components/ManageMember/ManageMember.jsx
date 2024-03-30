import Table from "react-bootstrap/Table";
import Sidenavbar from "../AdminDashboard/SideNavbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useQuery } from "react-query";
import EditLineIcon from "remixicon-react/EditLineIcon";
import DeleteBinLineIcon from "remixicon-react/DeleteBinLineIcon";
import Swal from "sweetalert2";
import "primereact/resources/themes/saga-blue/theme.css";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { Col, Row } from "react-bootstrap";

function ManageMember() {
  const [show, setShow] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteID, setDeleteID] = useState("");
  const [showEdit, setShowEdit] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [phoneNo, setPhoneNo] = useState();

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
      email: "",
      category: "",
      otherCategory: "",
      mobile: "",
      shop: "",
    },
  });

  const editMemberForm = useForm({
    validateInputChanges: true,
    initialValues: {
      _id: "",
      name: "",
      email: "",
      category: "",
      otherCategory: "",
      mobile: "",
      shop: "",
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
      const response = await axios.get("http://localhost:3001/member/accepted");
      return response.data;
    }
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error loading data</p>;
  }

  const editMember = async () => {
    try {
      const editMemberDetails = editMemberForm.getValues();
      await axios.put(
        `http://localhost:3001/member/update/${editMemberDetails._id}`,
        editMemberDetails
      );
      editMemberForm.reset();
      setShowEdit(false);
      Swal.fire({
        icon: "success",
        title: "Member Update Successfully",
        text: "You have successfully update a member",
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

  const addMember = async (formData) => {
    try {
      console.log(formData);
      await axios.post("http://localhost:3001/member/add", formData);

      reset();
      Swal.fire({
        icon: "success",
        title: "Member Added Successfully",
        text: "You have successfully added a member",
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
  const deleteMember = async (_id) => {
    try {
      await axios.delete(`http://localhost:3001/member/delete/${_id}`, {
        withCredentials: true,
      });
      Swal.fire({
        title: "Deleted!",
        text: "Member has been deleted.",
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
    editMemberForm.reset(); // Reset the form
  };

  const handleShowEdit = () => setShowEdit(true);

  const filteredData = data.filter((member) =>
    Object.values(member).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div>
      <Sidenavbar />
      <br />
      <center>
        <h3>All Shop Members</h3>
      </center>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Member</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group
              classNameName="mb-3"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label>
                Name <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="name"
                placeholder="Vinnath Pathirana"
                // autoFocus
                {...register("name", {
                  required: true,
                  pattern: /^[A-Za-z]+ [A-Za-z]+$/,
                })}
              />
              {errors.name && errors.name.type === "required" && (
                <span className="text-danger">This is required</span>
              )}
              {errors.name && errors.name.type === "pattern" && (
                <span className="text-danger">Please enter only letters</span>
              )}
            </Form.Group>
            <Form.Group
              classNameName="mb-3"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label>
                Email Address<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="vidura@gmail.com"
                // autoFocus
                {...register("email", {
                  required: true,
                  pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                })}
              />
              {errors.email && errors.email.type === "required" && (
                <span className="text-danger">This is required</span>
              )}
              {errors.email && errors.email.type === "pattern" && (
                <span className="text-danger">
                  Entered value does not match Email format
                </span>
              )}
            </Form.Group>
            <Form.Group
              classNameName="mb-3"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label>Shop Name</Form.Label>
              <span className="text-danger">*</span>
              <Form.Control
                type="text"
                placeholder="Sensus-hub"
                // autoFocus
                {...register("shop", {
                  required: true,
                })}
              />
            </Form.Group>
            <Form.Group classNameName="mb-3" controlId="formBasicEmail">
              <Form.Label>
                Category <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                as="select"
                {...register("category", { required: true })}
              >
                <option value="">Select Category</option>
                <option value="Fashion and Apparel">Fashion and Apparel</option>
                <option value="Entertainment and Leisure">
                  Electronics and Technology
                </option>
                <option value="Home and Furniture">Home and Furniture</option>
                <option value="Health and Beauty">Health and Beauty</option>
                <option value="Food and Dining">Food and Dining</option>
                <option value="Entertainment and Leisure">
                  Entertainment and Leisure
                </option>
                <option value="Jewelry and Watches">Jewelry and Watches</option>

                <option value="Other">Other</option>
              </Form.Control>
              {errors.category && (
                <span className="text-danger">This is required.</span>
              )}
              <br />
              {watch("category") === "Other" && (
                <Form.Group
                  classNameName="mb-3"
                  controlId="formBasicOtherCategory"
                >
                  <Form.Control
                    type="text"
                    placeholder="Enter your category"
                    // autoFocus
                    {...register("otherCategory", {
                      required: true,
                      pattern: /^[A-Za-z]+$/,
                    })}
                  />

                  {errors.otherCategory &&
                    errors.otherCategory.type === "required" && (
                      <span className="text-danger">This is required</span>
                    )}
                  {errors.otherCategory &&
                    errors.otherCategory.type === "pattern" && (
                      <span className="text-danger">
                        Please enter only letters
                      </span>
                    )}
                </Form.Group>
              )}
            </Form.Group>
            <Form.Group
              classNameName="mb-3"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label>
                Mobile Number <span className="text-danger">*</span>
              </Form.Label>
              <PhoneInput
                placeholder="Enter phone number"
                value={phoneNo}
                onChange={setPhoneNo}
                defaultCountry="LK"
                // autoFocus
                {...register("mobile", {
                  required: true,
                  // pattern:  /^0\d{9}$/,
                  // maxLength: 10,
                })}
              />
              {errors.mobile && errors.mobile.type === "required" && (
                <span className="text-danger">This is required</span>
              )}
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
              addMember(data);
              handleClose(); // Move handleClose to onSubmit handler
            })}
          >
            Add Member
          </Button>
        </Modal.Footer>
      </Modal>

      <div style={{ marginLeft: "260px", padding: "20px" }}>
        <center>
          <Row style={{ marginLeft: "-300px", padding: "40px" }}>
            <Col>
              <Form.Control
                type="search"
                placeholder="Search by Member ID"
                className="me-2"
                aria-label="Search"
                style={{ width: "400px", marginLeft: "400px" }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </Col>
            <Col>
              <Button
                style={{
                  marginLeft: "200px",
                  backgroundColor: "black",
                  borderColor: "black",
                }}
                onClick={handleShow}
              >
                Add Member
              </Button>
            </Col>
          </Row>
        </center>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Shop ID</th>
              <th>Name</th>
              <th>Shop Name</th>
              <th>Category</th>
              <th>Other</th>
              <th>Email</th>
              <th>Mobile Number</th>
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
                <tr key={member.cusMemberID}>
                  <td>{member.cusMemberID}</td>
                  <td>{member.name}</td>
                  <td>{member.shop}</td>
                  <td>{member.category}</td>
                  <td>{member.otherCategory}</td>
                  <td>{member.email}</td>
                  <td>{member.mobile}</td>
                  <td>
                    <EditLineIcon
                      onClick={() => {
                        editMemberForm.reset({
                          _id: member._id,
                          name: member.name,
                          email: member.email,
                          category: member.category,
                          otherCategory: member.otherCategory,
                          mobile: member.mobile,
                          shop: member.shop,
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
      <>
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
                deleteMember(deleteID);
              }}
            >
              Yes
            </Button>
          </Modal.Footer>
        </Modal>

        {/* edit member modal */}
        <Modal show={showEdit} onHide={handleCloseEdit}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Member</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                classNameName="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Vinnath Pathirana"
                  autoFocus
                  {...editMemberForm.register("name", {
                    // required: true,
                    // pattern: /^[A-Za-z]+ [A-Za-z]+$/,
                  })}
                />
              </Form.Group>
              <Form.Group
                classNameName="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="vidura@gmail.com"
                  // autoFocus
                  {...editMemberForm.register("email")}
                />
              </Form.Group>
              <Form.Group
                classNameName="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Shop Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Shop name"
                  // autoFocus
                  {...editMemberForm.register("shop")}
                />
              </Form.Group>
              <Form.Group classNameName="mb-3" controlId="formBasicEmail">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  as="select"
                  {...editMemberForm.register("category", { required: true })}
                >
                  <option value="">Select Category</option>
                  <option value="Fashion and Apparel">
                    Fashion and Apparel
                  </option>
                  <option value="Entertainment and Leisure">
                    Electronics and Technology
                  </option>
                  <option value="Home and Furniture">Home and Furniture</option>
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
                {watch("category") === "Other" && (
                  <Form.Group
                    classNameName="mb-3"
                    controlId="formBasicOtherCategory"
                  >
                    <Form.Control
                      type="text"
                      placeholder="Enter your category"
                      // autoFocus
                      {...editMemberForm("otherCategory", {
                        required: true,
                        pattern: /^[A-Za-z]+$/,
                      })}
                    />

                    {errors.otherCategory &&
                      errors.otherCategory.type === "required" && (
                        <span className="text-danger">This is required</span>
                      )}
                    {errors.otherCategory &&
                      errors.otherCategory.type === "pattern" && (
                        <span className="text-danger">
                          Please enter only letters
                        </span>
                      )}
                  </Form.Group>
                )}
              </Form.Group>
              <Form.Group
                classNameName="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Mobile Number</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="071-XXXXXXX"
                  // autoFocus
                  {...editMemberForm.register("mobile")}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseEdit}>
              Close
            </Button>
            <Button variant="primary" onClick={() => editMember()}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </div>
  );
}

export default ManageMember;
