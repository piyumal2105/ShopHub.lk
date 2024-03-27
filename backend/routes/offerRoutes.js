// backend/routes/offerRoutes.js
import express from "express";
import { createOffer } from "../controllers/offerController.js";

// Create Offer
const router = express.Router();

router.post("/create", createOffer);

export default router;
