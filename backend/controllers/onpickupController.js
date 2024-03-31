// Import necessary modules
import OnPickup from "../models/OnPickup.js";

// Controller for handling on-pickup registration logic
const onpickupController = {
  // Controller method to handle on-pickup registration
  register: async (req, res) => {
    try {
      // Extract data from request body
      const { firstName, lastName, email, phoneNumber, NIC, permanentAddress } = req.body;

      // Create new OnPickup object
      const newOnPickup = new OnPickup({
        firstName,
        lastName,
        // userName,
        email,
        // phoneNumber,
        NIC,
        permanentAddress
      });

      // Save on-pickup details to the database
      await newOnPickup.save();

      // Send success response
      res.status(201).json({ message: "On-pickup registration successful" });
    } catch (error) {
      // Send error response
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

export default onpickupController;

