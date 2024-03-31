// Import necessary modules
import express from "express";
import onpickupController from "../controllers/onpickupController.js";

// Initialize express router
const router = express.Router();

// Route for on-pickup registration
router.post("/register", onpickupController.register);

// Export router
export default router;
