// routes/customer.js

import express from "express";
import {
  register,
  login,
  getProfile,
  updateProfile,
  deleteProfile,
  getAllCustomers,
} from "../controllers/customerController.js";

const router = express.Router();

// POST request to register a new customer
router.post("/register", register);

// POST request to login
router.post("/login", login);

// GET request to fetch user profile by ID
router.get("/profile/:customerId", getProfile);

router.put("/updateprofile/:customerId", updateProfile);

router.delete("/deleteprofile/:customerId", deleteProfile);
router.get("/allcustomers", getAllCustomers);

export default router;
