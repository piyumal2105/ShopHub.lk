import express from "express";

import {
  createFAQ,
  getAllFAQs,
  getFAQById,
  updateFAQ,
  deleteFAQ,
} from "../controllers/faq.ctrl.js";

const router = express.Router();

router.post("/faqs/create", createFAQ);
router.get("/faqs/getall", getAllFAQs);
router.get("/faqs/getfaq/:id", getFAQById);
router.put("/faqs/updatefaq/:id", updateFAQ);
router.delete("/faqs/deletefaq/:id", deleteFAQ);

export default router;
