import express from "express";
import { addPromotion,getAllPromotions,updatePromotion,deletePromotion,getPromotionById } from "../controllers/promotions.controllers.js";

const router = express.Router();

router.post("/addPromotion", addPromotion);
router.get('/', getAllPromotions); // Get all promotions
router.get('/:id', getPromotionById); // Get a promotion by ID
router.put('/updatePromotion/:id', updatePromotion); // Update a promotion by ID
router.delete('/deletePromotion/:id', deletePromotion); // Delete a promotion by ID

export default router;
