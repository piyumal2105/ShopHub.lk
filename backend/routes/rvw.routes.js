import express from "express";

import {
  createRVW, 
  getAllRVWs,
  getRVWById,
  updateRVW,
  deleteRVW,
} from "../controllers/rvw.ctrl.js";

const router = express.Router();

router.post("/rvws/create", createRVW);
router.get("/rvws/getall", getAllRVWs);
router.get("/rvws/getrvw/:id", getRVWById);
router.put("/rvws/updatervw/:id", updateRVW);
router.delete("/rvws/deletervw/:id", deleteRVW);

export default router;
