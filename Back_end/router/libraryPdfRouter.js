import express from "express";
import { authGuard } from "../middleware/authMiddleware.js";

import uploadPDF from "../middleware/uploadPdfMiddleware.js";
import {
  createLibraryPdf,
  getLibraryPdf,
} from "../controllers/libraryPdfControllers.js";

const router = express.Router();

router.post("/:postId", authGuard, uploadPDF.single("pdf"), createLibraryPdf);
router.get("/:postId", getLibraryPdf);

export default router;
