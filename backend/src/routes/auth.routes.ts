import { Router } from "express";
import { register, login, googleAuth, refreshToken, logout, forgotPassword, resetPassword } from "../controllers/auth.controller";
import { authLimiter } from "../middlewares/rateLimiter";

const router = Router();

router.post("/register", authLimiter, register);
router.post("/login", authLimiter, login);
router.post("/google", googleAuth);
router.post("/refresh", refreshToken);
router.post("/logout", logout);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;
