import express from "express";
import { addPrize } from "../controllers/prizeController.js";
import {
    createBalance,
    getBalance,
    updateBalance,
} from "../controllers/LP_balanceController.js";
import {
    addLoyaltyPointHistory,
    getLoyaltyPointHistoryByCustomerId,
} from "../controllers/loyaltyPointHistoryController.js";

const router = express.Router();

router.post("/addPrize", addPrize);
router.post("/createBalance", createBalance);
router.get("/getBalance/:customerId", getBalance);
router.put("/updateLP/:customerId", updateBalance);
router.post("/addLpHistory", addLoyaltyPointHistory);

router.get("/getLpHistory/:customerId", getLoyaltyPointHistoryByCustomerId);

export default router;
