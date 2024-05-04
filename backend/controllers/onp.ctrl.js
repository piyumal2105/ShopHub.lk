// // Import necessary modules
// import OnPickup from "../models/OnPickup.js";

// // Controller for handling on-pickup registration logic
// const onpickupController = {
//   // Controller method to handle on-pickup registration
//   register: async (req, res) => {
//     try {
//       // Extract data from request body
//       const { firstName, lastName, email, phoneNumber, NIC, permanentAddress } = req.body;

//       // Check if required fields are provided
//       if (!firstName || !lastName || !email || !NIC || !permanentAddress) {
//         return res.status(400).json({ message: "Please provide all required fields." });
//       }

//       // Check if email is valid
//       if (!isValidEmail(email)) {
//         return res.status(400).json({ message: "Please provide a valid email address." });
//       }

//       // Create new OnPickup object
//       const newOnPickup = new OnPickup({
//         firstName,
//         lastName,
//         email,
//         phoneNumber, // Assuming phoneNumber is optional
//         NIC,
//         permanentAddress
//       });

//       // Save on-pickup details to the database
//       await newOnPickup.save();

//       // Send success response
//       res.status(201).json({ message: "On-pickup registration successful" });
//     } catch (error) {
//       // Send error response with detailed error message for debugging
//       res.status(500).json({ message: `Error registering on-pickup: ${error.message}` });
//     }
//   }
// };

// // Function to validate email format
// function isValidEmail(email) {
//   // Regular expression to validate email format
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   return emailRegex.test(email);
// }

// export default onpickupController;




import PICK from '../models/onp.model.js'; // Importing the FAQ model

// Controller for creating a new FAQ
export const createPICK = async (req, res) => {
  try {
    const {first_name,last_name, email, phone,address} = req.body;
    const newPICK = new PICK({ first_name,last_name, email, phone,address});
    await newPICK.save();
    res.status(201).json(newPICK);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller for getting all FAQs
export const getAllPICKs = async (req, res) => {
  try {
    const picks = await PICK.find();
    res.status(200).json(faqs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller for getting a single FAQ by ID
export const getPICKById = async (req, res) => {
  const { id } = req.params;
  try {
    const pick = await PICK.findById(id);
    if (!pick) return res.status(404).json({ message: 'Pickup not found' });
    res.status(200).json(pick);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller for updating a FAQ
export const updatePICK = async (req, res) => {
  const { id } = req.params;
  const { first_name,last_name, email, phone,nic,address } = req.body;
  try {
    const updatedPICK = await PICK.findByIdAndUpdate(id, { first_name,last_name, email, phone,nic,address}, { new: true });
    if (!updatedPICK) return res.status(404).json({ message: 'Pickup not found' });
    res.status(200).json(updatedPICK);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller for deleting a FAQ
export const deletePICK = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedPICK = await PICK.findByIdAndDelete(id);
    if (!deletedPICK) return res.status(404).json({ message: 'Pickup not found' });
    res.status(200).json({ message: 'Pickup deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};