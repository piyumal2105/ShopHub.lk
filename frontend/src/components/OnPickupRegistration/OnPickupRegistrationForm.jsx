// Frontend: OnPickupRegistrationForm.jsx

import { useState } from "react";
// import { useHistory } from 'react-router-dom';
import { Container, Form, Button, Card } from "react-bootstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import "primereact/resources/themes/saga-blue/theme.css";
import "react-phone-number-input/style.css";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-number-input";
import Swal from "sweetalert2";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const OnPickupRegistrationForm = () => {
  const [phoneNo, setPhoneNo] = useState('');
  const navigate = useNavigate();


  // const handleNICInputChange = (e) => {
  //   const { value } = e.target;
  //   // Remove non-digit characters and convert to upper case
  //   const formattedValue = value.replace(/[^0-9Vv]/g, "").toUpperCase();
  //   // Update the input field value
  //   setFormData({ ...formData, nic: formattedValue });
  // };

  const { register, formState: { errors }, handleSubmit, reset } = useForm({
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      address: "",
    },
  });

  const addMember = async (formData) => {
    // const history = useHistory(); 
    try {
      await axios.post("http://localhost:3001/pick/create", formData);

      Swal.fire({
        title: "Registration Successful!",
        text: "Congratulations! Your member registration request has been successfully sent!",
        icon: "success",
      });
      reset();
      navigate("/onpickupcart");
    } catch (err) {
      console.error("Add form error:", err);
      if (err.response && err.response.status === 500) {
        Swal.fire({
          title: "Registration Failed",
          text: "Internal Server Error occurred. Please try again later.",
          icon: "error",
        });
        
      } else {
        Swal.fire({
          title: "Registration Failed",
          text: "An error occurred while processing your request. Please try again later.",
          icon: "error",
        });
      }
    }
  };

  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ backgroundColor: "black", color: "white", height: "60px" }}
      >
        <center>Sign Up and get 10% off. Sign Up</center>
      </div>
      <br />
      <Header />
      <Container>
        <br />
        <br />
        <div className="d-flex justify-content-center align-items-center">
          <h3>On Pickup Registration</h3>
        </div>
        <br />
        <br />

        <Container className="d-flex justify-content-center align-items-center">
          <Card
            style={{
              borderRadius: "10px",
              borderColor: "black",
              borderWidth: "2px",
              width: "1000px",
              padding: "40px",
            }}
          >
            <Container>
              <Form onSubmit={handleSubmit(addMember)}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>
                    First Name<span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    {...register("first_name", { required: true })}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>
                    Last Name<span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    {...register("last_name", { required: true })}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>
                    Email Address<span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
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

                <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
                  <Form.Label>
                    Mobile Number<span className="text-danger">*</span>
                  </Form.Label>
                  <PhoneInput
                    placeholder="Enter phone number"
                    value={phoneNo}
                    onChange={setPhoneNo}
                    defaultCountry="LK"
                    {...register("phone", { required: true })}
                  />
                  {errors.mobile && errors.mobile.type === "required" && (
                    <span className="text-danger">This is required</span>
                  )}
                  <Form.Control.Feedback type="invalid">
                    Please enter a valid phone number.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicAddress">
                  <Form.Label>
                    Address<span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    {...register("address", { required: true })}
                  />
                  {errors.address && errors.address.type === "required" && (
                    <span className="text-danger">This is required</span>
                  )}
                </Form.Group>

                <br />
                <center>
                  <Button
                    type="submit"
                    style={{
                      width: "150px",
                      backgroundColor: "black",
                      borderColor: "black",
                    }}
                  >
                    Submit
                  </Button>
                </center>
              </Form>
            </Container>
          </Card>
        </Container>
        <br />
        <br />
        <br />
      </Container>
      <Footer />
    </>
  );
};

export default OnPickupRegistrationForm;
