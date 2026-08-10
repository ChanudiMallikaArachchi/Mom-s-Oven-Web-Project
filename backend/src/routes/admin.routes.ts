import { Router } from "express";
import {
  getDashboardMetrics,
  getRecentSales,
  getAdminCakes,
  createCake,
  updateCake,
  deleteCake,
  uploadCakeImage,
  getAdminOrders,
  updateOrderStatus,
} from "../controllers/admin.controller";
import { requireAdmin } from "../middlewares/auth";

const router = Router();

router.use(requireAdmin);

router.get("/dashboard/metrics", getDashboardMetrics);
router.get("/dashboard/recent-sales", getRecentSales);

router.get("/cakes", getAdminCakes);
router.post("/cakes", createCake);
router.patch("/cakes/:id", updateCake);
router.delete("/cakes/:id", deleteCake);
router.post("/cakes/upload-image", uploadCakeImage);

router.get("/orders", getAdminOrders);
router.patch("/orders/:id/status", updateOrderStatus);

export default router;
