import express from "express";
import {
    createOffer,
    getOffer,
    updateOffer,
    deleteOffer,
} from "../controllers/offerController.js";

const router = express.Router();

// Create Offer
router.post("/create", createOffer);

// Get Offer by ID
router.get("/getoffer", getOffer);

// Update Offer by ID
router.put("/updateoffer/:offerId", updateOffer);

// Delete Offer by ID
router.delete("/deleteoffer/offerId", deleteOffer);

export default router;
