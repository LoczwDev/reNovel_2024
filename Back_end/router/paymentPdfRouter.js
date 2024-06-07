import { Router } from "express";
import express from "express";

import { adminGuard, authGuard } from "../middleware/authMiddleware";
import {
  getAlllPayment,
  getPaymentPdfById,
  paymentSuccess,
} from "../controllers/paymentPdfControllers";

const router = express.Router();
router.post("/", authGuard, paymentSuccess);
router.get("/:pdfId", authGuard, getPaymentPdfById);
router.get("/", getAlllPayment);

export default router;
