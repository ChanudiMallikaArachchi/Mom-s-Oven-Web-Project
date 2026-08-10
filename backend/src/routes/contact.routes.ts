import { Router } from "express";
import { submitContactForm } from "../controllers/contact.controller";
import { contactLimiter } from "../middlewares/rateLimiter";

const router = Router();

router.post("/", contactLimiter, submitContactForm);

export default router;
