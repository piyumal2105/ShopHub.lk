import mongoose from "mongoose";

// Define schema for OnPickup model
const onPickupSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
    unique: true, // Assuming each user has a unique username
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String, // Assuming phone number can contain characters such as '+', '-', etc.
    required: true,
  },
  NIC: {
    type: String,
    required: true,
    unique: true, // Assuming NIC is unique for each user
    validate: {
      validator: function(nic) {
        // Validate NIC format: 9 numbers followed by 'V' or 'v'
        return /^[0-9]{9}[Vv]$/.test(nic);
      },
      message: props => `${props.value} is not a valid NIC number! Must be 9 digits followed by 'V' or 'v'.`
    }
  },
  permanentAddress: {
    type: String,
    required: true,
  },
});

// Create and export OnPickup model
export default mongoose.model("OnPickup", onPickupSchema);
