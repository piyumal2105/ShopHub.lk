// routes/prizeRoutes.js
import express from "express";
import { addPrize } from "../controllers/prizeController.js";

const router = express.Router();

router.post("/add", addPrize);

export default router;
