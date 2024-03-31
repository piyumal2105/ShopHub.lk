import express from "express";
import paymentController from "../controllers/paymentController.js";

const router = express.Router();

router.post("/makePayment", paymentController.makePayment);

export default router;
