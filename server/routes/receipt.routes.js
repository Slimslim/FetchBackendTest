import { Router } from "express";
import * as receiptController from "../controllers/receipt.controller.js";

const router = Router();
router.get("/", receiptController.getAllReceipts);
router.get("/:id", receiptController.getReceiptById);
router.get("/:id/points", receiptController.getPointsId);
router.post("/process", receiptController.submitReceipt);

export default router;
