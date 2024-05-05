import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";

const UserProfile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    email: "",
    number: "",
    gender: "",
  });

  const { customerId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/customer/profile/${customerId}`
        );
        setUserProfile(response.data);
        setFormData(response.data);
      } catch (error) {
        setError(error.message || "Error fetching user profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [customerId]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = async () => {
    try {
      await axios.put(
        `http://localhost:3001/customer/updateprofile/${customerId}`,
        formData
      );
      setEditMode(false);
      // Optionally, fetch and update the user profile after successful update
    } catch (error) {
      console.error("Error updating profile:", error);
      // Handle error
    }
  };

  const handleDeleteClick = async () => {
    try {
      await axios.delete(
        `http://localhost:3001/customer/deleteprofile/${customerId}`
      );
      navigate("/");
    } catch (error) {
      console.error("Error deleting profile:", error);
      // Handle error
    }
  };

  if (loading) {
    return (
      <Container maxWidth="md" style={{ marginTop: 50 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" style={{ marginTop: 50 }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Container>
    );
  }

  return (
    <div>
      {" "}
      {/* Apply background to the entire page */}
      <Header />
      <div style={{}}>
        <Container maxWidth="md">
          <Typography variant="h4" gutterBottom>
            User Profile
          </Typography>
          {editMode ? (
            <>
              <TextField
                name="firstName"
                label="First Name"
                value={formData.firstName}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                name="lastName"
                label="Last Name"
                value={formData.lastName}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                name="email"
                label="Email"
                value={formData.email}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                name="number"
                label="Number"
                value={formData.number}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                name="gender"
                label="Gender"
                value={formData.gender}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                name="address"
                label="Address"
                value={formData.address}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <Button
                onClick={handleSaveClick}
                variant="contained"
                color="primary"
              >
                Save
              </Button>
            </>
          ) : (
            <>
              <Card
                sx={{ bgcolor: "#EEF7FF", width: "50%" }}
                variant="outlined"
              >
                <CardContent>
                  <Typography variant="body1" gutterBottom>
                    <strong>First Name:</strong> {userProfile.firstName}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <strong>Last Name:</strong> {userProfile.lastName}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <strong>Email:</strong> {userProfile.email}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <strong>Number:</strong> {userProfile.number}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <strong>Gender:</strong> {userProfile.gender}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <strong>Address:</strong> {userProfile.address}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    onClick={handleEditClick}
                    variant="contained"
                    color="primary"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={handleDeleteClick}
                    variant="contained"
                    color="secondary"
                  >
                    Delete Profile
                  </Button>
                </CardActions>
              </Card>
            </>
          )}
        </Container>
      </div>
      <div style={{ marginTop: "150px" }}>
        <Footer />
      </div>
    </div>
  );
};

export default UserProfile;
