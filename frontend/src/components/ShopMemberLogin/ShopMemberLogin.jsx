import { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ShopMemberLogin = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState("");

  const navigate = useNavigate();

  // handling the email changing
  const handleEmailChange = (e) => {
    // reset errors
    setErrors("");

    setCredentials({ ...credentials, email: e.target.value });
  };

  // handle password change
  const handlePasswordChange = (e) => {
    setCredentials({ ...credentials, password: e.target.value });
  };

  const validateCredentials = async () => {
    return /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(credentials.email);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateCredentials()) {
      try {
        const response = await axios.post(
          "http://localhost:3001/member/login",
          credentials
        );
        const user = response.data.user;

        // store user in local storage
        localStorage.setItem("user", JSON.stringify(user));

        console.log(user._id);

        // navigate to the profile route with the user ID as a parameter

        navigate("/inventory");
      } catch (error) {
        console.log(error.response.data.message);
      }
    } else {
      setErrors("Please enter a valid email");
    }
  };
  return (
    <>
      <Card
        style={{
          borderWidth: "2px",
          padding: "40px",
          height: "400px",
          width: "80%",
        }}
        className="shadow"
      >
        <p className="h3 text-center">Shop Member Login</p>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                placeholder="email@example.com"
                value={credentials.email}
                required
                onChange={handleEmailChange}
              />
              {errors.length > 0 ? (
                <p style={{ color: "red" }}>{errors}</p>
              ) : null}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                required
                value={credentials.password}
                onChange={handlePasswordChange}
              />
            </Form.Group>
            <Button
              type="submit"
              style={{
                width: "100%",
                backgroundColor: "black",
                borderColor: "black",
              }}
              className="mt-3"
            >
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

export default ShopMemberLogin;
