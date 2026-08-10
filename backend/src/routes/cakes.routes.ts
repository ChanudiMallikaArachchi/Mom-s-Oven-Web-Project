import { Router } from "express";
import { getCakes, getCakeById } from "../controllers/cakes.controller";

const router = Router();

router.get("/", getCakes);
router.get("/:id", getCakeById);

export default router;
