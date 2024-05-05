import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Swal from "sweetalert2";
import Form from "react-bootstrap/Form";
import { Button, Card } from "react-bootstrap";

function ContactUs() {
  const [result, setResult] = React.useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    // setResult("Sending....");
    Swal.showLoading(); // Show loading SweetAlert
    const formData = new FormData(event.target);

    formData.append("access_key", "6884c6fc-c82a-44b4-90c8-396194514759");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        Swal.fire({
          icon: "success",
          title: "Submitted!",
          text: "Form Submitted Successfully",
        });
        setResult("Form Submitted Successfully");
        event.target.reset();
      } else {
        console.log("Error", data);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: data.message,
        });
        setResult(data.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
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
      <br />
      <br />
      <h2
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Contact Us
      </h2>
      <br />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card
          style={{
            width: "50%",
            padding: "30px",
            borderRadius: "10px",
            borderWidth: "2px",
            borderColor: "black",
          }}
        >
          <div>
            <Form onSubmit={onSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Name :</Form.Label>
                <Form.Control
                  required
                  name="name"
                  type="text"
                  placeholder="Enter Your Name"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email Address :</Form.Label>
                <Form.Control
                  required
                  name="email"
                  type="email"
                  placeholder="Enter Your Email"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Message :</Form.Label>
                <Form.Control
                  required
                  name="message"
                  type="text"
                  placeholder="Type Your Message"
                />
              </Form.Group>
              <br />
              <center>
                <Button
                  style={{ backgroundColor: "black", borderColor: "black" }}
                  type="submit"
                >
                  Send Your Message
                </Button>
              </center>
            </Form>
          </div>
        </Card>
      </div>
      <br />
      <br />
      <Footer />
    </>
  );
}

export default ContactUs;
