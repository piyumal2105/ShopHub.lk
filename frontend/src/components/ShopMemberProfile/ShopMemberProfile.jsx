import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import Card from "react-bootstrap/Card";
import ShopMemberNavbar from "../ShopMemberNavbar/ShopMemberNavBar";
import { Row, Col, Form, Button, Modal } from "react-bootstrap";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";

function ShopMemberProfile() {
  //update profile
  const { refetch } = useQuery("acceptedMemberData", async () => {
    const response = await axios.get(`http://localhost:3001/member/${userID}`);
    return response.data;
  });

  const [showEdit, setShowEdit] = useState(false);

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

  const editMember = async () => {
    try {
      const editMemberDetails = editMemberForm.getValues();
      await axios.put(
        `http://localhost:3001/member/update/${editMemberDetails._id}`,
        editMemberDetails
      );

      // Fetch updated user data after successful update
      const response = await axios.get(
        `http://localhost:3001/member/${userID}`
      );
      const updatedUserData = response.data;

      // Update local state with the fetched updated user data
      setUser(updatedUserData);

      editMemberForm.reset();
      setShowEdit(false);
      Swal.fire({
        icon: "success",
        title: "Profile Update Successfully",
        text: "You have successfully updated your profile",
      });
    } catch (err) {
      console.log("edit form error", err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  const handleCloseEdit = () => {
    setShowEdit(false);
    editMemberForm.reset(); // Reset the form
  };

  const handleShowEdit = () => setShowEdit(true);

  //end update profile

  const [show, setShow] = useState(false);
  const [user, setUser] = useState({});
  const params = useParams();
  const userID = params.id;

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(`http://localhost:3001/member/${userID}`);
      const data = await response.json();
      setUser(data);
      console.log(data);
    };
    fetchUser();
  }, [userID]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:3001/member/reset/${userID}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );

      if (response.ok) {
        // Status code 2xx indicates success
        const data = await response.json();
        console.log(data);
        Swal.fire({
          // Using SweetAlert2 for success message
          icon: "success",
          title: " Update Success!",
          text: "Your password is update successfully!",
        });
      } else {
        // Status code outside of 2xx indicates an error
        const errorData = await response.json();
        console.error("Update Failed:", errorData);
        Swal.fire({
          // Using SweetAlert2 for error message
          icon: "error",
          title: "Oops...",
          text: "Update Failed.",
        });
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      alert("An unexpected error occurred"); // or display a generic error message
    }
  };

  return (
    <>
      <ShopMemberNavbar />
      <div
        style={{
          height: "30%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card
          style={{
            marginTop: "50px",
            width: "70%",
            borderRadius: "6px",
            borderColor: "#232149",
            borderWidth: "2px",
            padding: "30px",
          }}
        >
          <Card.Body>
            <Row>
              <Col>
                <h2>Shop Profile</h2>
              </Col>
              <Col></Col>
            </Row>
            <hr />
            <Row>
              <Col>
                <p>
                  <strong>Shop ID :</strong>
                </p>{" "}
                <p className="form-control">{user.cusMemberID}</p>
              </Col>
              <Col>
                <p>
                  <strong>Shop Name :</strong>
                </p>{" "}
                <p className="form-control">{user.shop}</p>
                <h6> </h6>
              </Col>
            </Row>
            <Row>
              <Col>
                <p>
                  <strong>Owner Name :</strong>
                </p>{" "}
                <p className="form-control">{user.name}</p>
              </Col>
              <Col>
                <p>
                  <strong>Email :</strong>
                </p>{" "}
                <p className="form-control">{user.email}</p>
              </Col>
            </Row>
            <Row>
              <Col>
                <p>
                  <strong>Phone :</strong>
                </p>{" "}
                <p className="form-control">{user.mobile}</p>
              </Col>
              <Col>
                <p>
                  <strong>Shop Category :</strong>
                </p>{" "}
                <p className="form-control">{user.category}</p>
              </Col>
            </Row>

            {/* <Row>
              <Col>
                <p>
                  <strong>Member Updated Date :</strong>
                </p>{" "}
                <p className="form-control">{formatDate(user.updatedAt)}</p>
              </Col>
            </Row> */}

            <Row>
              <Col>
                <Button
                  onClick={(event) => {
                    event.preventDefault();
                    editMemberForm.reset({
                      _id: user._id,
                      name: user.name,
                      email: user.email,
                      category: user.category,
                      mobile: user.mobile,
                      shop: user.shop,
                    });
                    setShowEdit(true);
                  }}
                  variant="primary"
                  href=""
                  style={{
                    float: "left",
                    margin: "10px",
                    backgroundColor: "black",
                    borderColor: "black",
                  }}
                >
                  Update Profile
                </Button>
              </Col>
              <Col>
                <Button
                  variant="primary"
                  onClick={handleShow}
                  style={{
                    float: "right",
                    margin: "10px",
                    backgroundColor: "black",
                    borderColor: "black",
                  }}
                >
                  Change Password
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </div>
      {/* change password Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formNewPassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="New Password"
                name="password"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                onChange={handleChange}
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
            onClick={(e) => {
              handleSubmit(e);
              handleClose();
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <br />
      <br />
      {/* edit profile details Modal */}
      <Modal show={showEdit} onHide={setShowEdit}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Member</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Vinnath Pathirana"
                // autoFocus
                {...editMemberForm.register("name", {})}
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
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="vidura@gmail.com"
                // autoFocus
                {...editMemberForm.register("email")}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
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
      {/* <Footer /> */}
    </>
  );
}

export default ShopMemberProfile;
