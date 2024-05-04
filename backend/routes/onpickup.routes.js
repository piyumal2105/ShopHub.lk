import express from "express";

import { addToCart,getProductListFromCart,deleteProductFromCart  } from "../controllers/onpickup.controller.js";
import {updateProduct} from "../controllers/product.controller.js"; // Import the controller function for adding items to the cart

const router = express.Router();

// Route for adding items to the cart
router.post("/add", addToCart);
router.get("/productlist", getProductListFromCart);
router.delete("/delete/:id", deleteProductFromCart);
// router.put("/update/:id", updateCartItemQuantity);
router.put("/updateProduct/:id", updateProduct);

export default router;
