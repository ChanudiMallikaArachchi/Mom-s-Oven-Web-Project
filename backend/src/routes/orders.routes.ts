import { Router } from "express";
import { createOrder, createPaymentIntent, handlePaymentWebhook, getOrderByNumber, trackOrder } from "../controllers/orders.controller";

const router = Router();

router.post("/", createOrder);
router.post("/:id/pay", createPaymentIntent);
router.post("/webhooks/payment", handlePaymentWebhook);
router.get("/:orderNumber", getOrderByNumber);
router.get("/:orderNumber/track", trackOrder);

export default router;
