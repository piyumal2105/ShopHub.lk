import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

const UserProfile = () => {
  const [userProfile, setUserProfile] = useState(null); // Initialize as null
  const [loading, setLoading] = useState(true); // Initialize loading state
  const [error, setError] = useState(null); // Initialize error state

  const { customerId } = useParams();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/customer/profile/${customerId}`
        );
        setUserProfile(response.data);
      } catch (error) {
        setError(error.message || "Error fetching user profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [customerId]); // Fetch profile when customerId changes

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
    <Container maxWidth="md" style={{ marginTop: 50 }}>
      <Typography variant="h4" gutterBottom>
        User Profile
      </Typography>
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
    </Container>
  );
};

export default UserProfile;
