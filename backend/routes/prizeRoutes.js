import express from "express";
import { addPrize } from "../controllers/prizeController.js";
import {
    createBalance,
    getBalance,
    updateBalance,
} from "../controllers/LP_balanceController.js";

const router = express.Router();

router.post("/add", addPrize);
router.post("/createBalance", createBalance);
router.get("/getBalance/:customerId", getBalance);
router.put("/updateLP/:customerId", updateBalance);

export default router;
