import { Response, NextFunction } from "express";
import { prisma } from "../config/db";
import { AuthenticatedRequest } from "../middlewares/auth";

export async function getCart(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const userId = req.user?.userId;
    const cartSessionId = req.cookies?.cartSessionId;

    if (!userId && !cartSessionId) {
      return res.json({ cart: [] });
    }

    const cart = await prisma.cartItem.findMany({
      where: userId ? { userId } : { cartSessionId },
      include: { cake: true },
    });

    return res.json({ cart });
  } catch (error) {
    next(error);
  }
}

export async function addToCart(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const { cakeId, quantity = 1, customization } = req.body;
    const userId = req.user?.userId;
    let cartSessionId = req.cookies?.cartSessionId;

    if (!userId && !cartSessionId) {
      cartSessionId = `guest_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
      res.cookie("cartSessionId", cartSessionId, { maxAge: 7 * 24 * 60 * 60 * 1000 });
    }

    const item = await prisma.cartItem.create({
      data: {
        userId,
        cartSessionId,
        cakeId,
        quantity,
        customization,
      },
      include: { cake: true },
    });

    return res.status(201).json({ item });
  } catch (error) {
    next(error);
  }
}

export async function updateCartItem(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    const item = await prisma.cartItem.update({
      where: { id },
      data: { quantity },
      include: { cake: true },
    });

    return res.json({ item });
  } catch (error) {
    next(error);
  }
}

export async function removeCartItem(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    await prisma.cartItem.delete({ where: { id } });
    return res.json({ message: "Item removed from cart" });
  } catch (error) {
    next(error);
  }
}

export async function mergeCart(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const userId = req.user?.userId;
    const cartSessionId = req.cookies?.cartSessionId;

    if (userId && cartSessionId) {
      await prisma.cartItem.updateMany({
        where: { cartSessionId },
        data: { userId, cartSessionId: null },
      });
      res.clearCookie("cartSessionId");
    }

    return res.json({ message: "Cart merged successfully" });
  } catch (error) {
    next(error);
  }
}
