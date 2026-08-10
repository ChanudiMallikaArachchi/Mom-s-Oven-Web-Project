import { Request, Response, NextFunction } from "express";
import { prisma } from "../config/db";
import { AuthenticatedRequest } from "../middlewares/auth";
import { generateOrderNumber } from "../utils/orderNumber";

export async function createOrder(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const { customerName, phone, email, addressLine, paymentMethod = "CARD", items } = req.body;
    const userId = req.user?.userId;

    const orderNumber = generateOrderNumber();

    let subtotal = 0;
    const orderItemsData = items.map((item: any) => {
      subtotal += item.price * item.quantity;
      return {
        cakeId: item.cakeId,
        cakeTitleSnapshot: item.cakeTitle,
        priceSnapshot: item.price,
        quantity: item.quantity,
        customization: item.customization,
      };
    });

    const deliveryFee = 300.0;
    const total = subtotal + deliveryFee;

    const order = await prisma.order.create({
      data: {
        orderNumber,
        userId,
        customerName,
        phone,
        email,
        addressLine,
        paymentMethod,
        subtotal,
        deliveryFee,
        total,
        items: {
          create: orderItemsData,
        },
        statusHistory: {
          create: {
            status: "RECEIVED",
          },
        },
      },
      include: {
        items: true,
        statusHistory: true,
      },
    });

    return res.status(201).json({ order });
  } catch (error) {
    next(error);
  }
}

export async function createPaymentIntent(req: Request, res: Response) {
  const { id } = req.params;
  const order = await prisma.order.findUnique({ where: { id } });
  if (!order) {
    return res.status(404).json({ error: { code: "NOT_FOUND", message: "Order not found" } });
  }

  // Support Stripe / PayHere mock client secret
  return res.json({
    clientSecret: `pi_mock_${order.id}_secret`,
    paymentProvider: process.env.PAYMENT_PROVIDER || "STRIPE",
    totalAmount: order.total,
  });
}

export async function handlePaymentWebhook(req: Request, res: Response) {
  // Confirm payment webhook
  return res.json({ received: true });
}

export async function getOrderByNumber(req: Request, res: Response, next: NextFunction) {
  try {
    const { orderNumber } = req.params;
    const order = await prisma.order.findUnique({
      where: { orderNumber },
      include: { items: true, statusHistory: true },
    });

    if (!order) {
      return res.status(404).json({ error: { code: "NOT_FOUND", message: "Order not found" } });
    }

    return res.json({ order });
  } catch (error) {
    next(error);
  }
}

export async function trackOrder(req: Request, res: Response, next: NextFunction) {
  try {
    const { orderNumber } = req.params;
    const order = await prisma.order.findUnique({
      where: { orderNumber },
      include: { statusHistory: { orderBy: { changedAt: "asc" } } },
    });

    if (!order) {
      return res.status(404).json({ error: { code: "NOT_FOUND", message: "Order not found" } });
    }

    return res.json({
      orderNumber: order.orderNumber,
      status: order.status,
      timeline: order.statusHistory,
    });
  } catch (error) {
    next(error);
  }
}
