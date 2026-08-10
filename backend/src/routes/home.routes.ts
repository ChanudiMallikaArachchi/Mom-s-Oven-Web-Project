import { Router } from "express";
import { getFeaturedCakes, getTestimonials } from "../controllers/home.controller";

const router = Router();

router.get("/featured-cakes", getFeaturedCakes);
router.get("/testimonials", getTestimonials);

export default router;
