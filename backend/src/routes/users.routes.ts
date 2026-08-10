import { Router } from "express";
import { getMe, updateMe, getMyOrders, getMyAddresses, addAddress, deleteAddress } from "../controllers/users.controller";
import { requireAuth } from "../middlewares/auth";

const router = Router();

router.use(requireAuth);

router.get("/me", getMe);
router.patch("/me", updateMe);
router.get("/me/orders", getMyOrders);
router.get("/me/addresses", getMyAddresses);
router.post("/me/addresses", addAddress);
router.delete("/me/addresses/:id", deleteAddress);

export default router;
