import { Response, NextFunction } from "express";
import { prisma } from "../config/db";
import { AuthenticatedRequest } from "../middlewares/auth";

export async function getMe(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const userId = req.user?.userId;
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true, email: true, phone: true, role: true, createdAt: true },
    });

    return res.json({ user });
  } catch (error) {
    next(error);
  }
}

export async function updateMe(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const userId = req.user?.userId;
    const { name, phone } = req.body;

    const user = await prisma.user.update({
      where: { id: userId },
      data: { name, phone },
      select: { id: true, name: true, email: true, phone: true, role: true },
    });

    return res.json({ user });
  } catch (error) {
    next(error);
  }
}

export async function getMyOrders(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const userId = req.user?.userId;
    const orders = await prisma.order.findMany({
      where: { userId },
      include: { items: true },
      orderBy: { createdAt: "desc" },
    });

    return res.json({ orders });
  } catch (error) {
    next(error);
  }
}

export async function getMyAddresses(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const userId = req.user?.userId;
    const addresses = await prisma.address.findMany({
      where: { userId },
    });

    return res.json({ addresses });
  } catch (error) {
    next(error);
  }
}

export async function addAddress(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const userId = req.user?.userId;
    const { label, line1, line2, city, postalCode, isDefault } = req.body;

    const address = await prisma.address.create({
      data: {
        userId: userId!,
        label,
        line1,
        line2,
        city,
        postalCode,
        isDefault,
      },
    });

    return res.status(201).json({ address });
  } catch (error) {
    next(error);
  }
}

export async function deleteAddress(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    await prisma.address.delete({ where: { id } });
    return res.json({ message: "Address deleted" });
  } catch (error) {
    next(error);
  }
}
