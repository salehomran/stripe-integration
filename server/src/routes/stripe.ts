import express from "express";
import { createCheckoutSessionHosted } from "../controllers/stripeController";
const router = express.Router();

router.post("/create-checkout-session-hosted", createCheckoutSessionHosted)

export default router;