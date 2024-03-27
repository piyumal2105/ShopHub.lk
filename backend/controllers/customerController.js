import Customer from "../models/customer.js";

export const register = async (req, res) => {
  try {
    const { firstName, lastName, address, email, number, gender, password } =
      req.body;
    // Check if email already exists
    const existingCustomer = await Customer.findOne({ email });
    if (existingCustomer) {
      return res.status(400).json({ message: "Email already exists" });
    }
    // Create new customer
    const newCustomer = new Customer({
      firstName,
      lastName,
      address,
      email,
      number,
      password, // Store the password as it is
      gender,
    });
    await newCustomer.save();
    res.status(201).json({ message: "Customer registered successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Find the customer by email
    const customer = await Customer.findOne({ email });
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    // Compare passwords
    if (password !== customer.password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    res
      .status(200)
      .json({ message: "Login successful", customerId: customer._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProfile = async (req, res) => {
  try {
    const customerId = req.params.customerId; // Assuming customerId is passed in the URL
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.status(200).json(customer);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
