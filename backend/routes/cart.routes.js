

import express from "express";

import { addToCart,getProductListFromCart,deleteProductFromCart    } from "../controllers/cart.controller.js"; // Import the controller function for adding items to the cart

const router = express.Router();

// Route for adding items to the cart
router.post("/add", addToCart);
router.get("/product-list", getProductListFromCart);
router.delete("/delete/:id", deleteProductFromCart);

export default router;
