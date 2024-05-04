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
import {
    createOfferPurchase,
    getOfferPurchase,
} from "../controllers/offerPurchaseController.js";

const router = express.Router();

router.post("/addPrize", addPrize);

// LP Balance routes
router.post("/createBalance", createBalance);
router.get("/getBalance/:customerId", getBalance);
router.put("/updateLP/:customerId", updateBalance);

// Loyalty Point History routes
router.post("/addLpHistory", addLoyaltyPointHistory);
router.get("/getLpHistory/:customerId", getLoyaltyPointHistoryByCustomerId);

// Offer Purchase routes
router.post("/offerpurchase", createOfferPurchase);
router.get("/offerpurchase/:customerId", getOfferPurchase);
// router.put("/offerpurchase/:offerPurchaseId", updateOfferPurchase);
// router.delete("/offerpurchase/:offerPurchaseId", deleteOfferPurchase);

export default router;
