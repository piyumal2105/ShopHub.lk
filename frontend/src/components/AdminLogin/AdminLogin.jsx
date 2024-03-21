import { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
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
      // if the email
      console.log(credentials);

      await axios
        .post("http://localhost:3001/admin/login", credentials)
        .then((user) => {
          // store
          localStorage.setItem("admin", JSON.stringify(user.data.admin));

          // navigate to the /requested
          navigate("/customers");
        })
        .catch((error) => {
          console.log(error.response.data.message);
        });
    } else {
      setErrors("Please enter valid email");
    }
  };
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card style={{ width: "30%" }} className="shadow">
        <br />
        <p className="h3 text-center">Admin Login</p>
        <br />
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
            <br />
            <Button type="submit" style={{ width: "100%" }} className="mt-3">
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default AdminLogin;
