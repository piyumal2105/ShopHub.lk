import { useState } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import "primereact/resources/themes/saga-blue/theme.css";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import Swal from "sweetalert2";

const MemberRegistration = () => {
  const [showOtherInput, setShowOtherInput] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    reset,
    watch,
    unregister,
  } = useForm({
    validateInputChanges: true,
    initialValues: {
      name: "",
      email: "",
      shop: "",
      category: "",
      otherCategory: "",
      mobile: "",
    },
  });

  const handleJobRoleChange = (e) => {
    setShowOtherInput(e.target.value === "others");
  };

  const addMember = async (formData) => {
    try {
      await axios.post("http://localhost:3001/member/register", formData);

      Swal.fire({
        title: "Registration Successful!",
        text: "Congratulations! Your member registration request has been successfully send!",
        icon: "success",
      });
      reset();
    } catch (err) {
      console.log("Add form error:", err);
    }
  };

  const [date, setDate] = useState(null);
  const [phoneNo, setPhoneNo] = useState();

  return (
    <>
      <Container>
        <br />
        <br />
        <div className="d-flex justify-content-center align-items-center">
          <h3>Shop Registration</h3>
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
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>
                    Full Name<span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Suneth Jayaweera"
                    {...register("name", {
                      required: true,
                      pattern: /^[A-Za-z]+ [A-Za-z]+$/,
                    })}
                  />

                  {errors.name && errors.name.type === "required" && (
                    <span className="text-danger">This is required</span>
                  )}
                  {errors.name && errors.name.type === "pattern" && (
                    <span className="text-danger">Please enter two name</span>
                  )}
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Shop Name</Form.Label>
                  <span className="text-danger">*</span>
                  <Form.Control
                    type="text"
                    placeholder="Shop name"
                    {...register("shop", { required: true })}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>
                    Email Address<span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="example@example.com"
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
                    {...register("mobile", {
                      required: true,
                    })}
                  />
                  {errors.mobile && errors.mobile.type === "required" && (
                    <span className="text-danger">This is required</span>
                  )}
                  <Form.Control.Feedback type="invalid">
                    Please enter a valid phone number.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>
                    Category<span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    as="select"
                    {...register("category", { required: true })}
                  >
                    <option value="">Select Category</option>
                    <option value="Fashion and Apparel">
                      Fashion and Apparel
                    </option>
                    <option value="Entertainment and Leisure">
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
                  {watch("category") === "Other" && (
                    <Form.Group
                      className="mb-3"
                      controlId="formBasicOtherCategory"
                    >
                      <Form.Control
                        type="text"
                        placeholder="Enter your category"
                        // autoFocus
                        {...register("otherCategory", {
                          required: true,
                          // pattern: /^[A-Za-z]+$/,
                        })}
                      />
                    </Form.Group>
                  )}
                </Form.Group>
                <br />
                <center>
                  <Button
                    type="submit"
                    onClick={handleSubmit((data) => {
                      addMember(data);
                    })}
                    style={{
                      width: "150px",
                      backgroundColor: "black",
                      borderColor: "black",
                    }}
                  >
                    Submit
                  </Button>
                </center>
                <div className="flex gap-2 text-sm- mt-5">
                  <Button
                    style={{
                      backgroundColor: "white",
                      borderColor: "white",
                      color: "black",
                    }}
                  >
                    Have an account
                  </Button>
                  <Button
                    href="/shopMember/login"
                    style={{
                      backgroundColor: "white",
                      borderColor: "white",
                      color: "blue",
                    }}
                  >
                    Log in
                  </Button>
                </div>
              </Form>
            </Container>
          </Card>
        </Container>
        <br />
        <br />
        <br />
      </Container>
    </>
  );
};

export default MemberRegistration;
