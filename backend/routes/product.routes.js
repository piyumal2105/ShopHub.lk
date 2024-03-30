import express from "express";

import {
  addProduct,
  getAllItems,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";

const router = express.Router();

router.get("/", getAllItems);
router.post("/addProduct", addProduct);
router.put("/updateProduct/:id", updateProduct);
router.delete("/delete/:id", deleteProduct);
router.get("/:id", getProductById);

export default router;
