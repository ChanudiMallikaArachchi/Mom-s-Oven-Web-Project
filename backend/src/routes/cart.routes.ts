import { Router } from "express";
import { getCart, addToCart, updateCartItem, removeCartItem, mergeCart } from "../controllers/cart.controller";

const router = Router();

router.get("/", getCart);
router.post("/items", addToCart);
router.patch("/items/:id", updateCartItem);
router.delete("/items/:id", removeCartItem);
router.post("/merge", mergeCart);

export default router;
