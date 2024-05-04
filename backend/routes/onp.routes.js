// import express from "express";

import express from "express";

import {
  createPICK, 
  getAllPICKs,
  getPICKById,
  updatePICK,
  deletePICK,
} from "../controllers/onp.ctrl.js";

const router = express.Router();

router.post("/create", createPICK);
router.get("/getall", getAllPICKs);
router.get("/getpick/:id", getPICKById);
router.put("/updatepick/:id", updatePICK);
router.delete("/deletepick/:id", deletePICK);

export default router;