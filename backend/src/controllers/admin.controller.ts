import { Request, Response, NextFunction } from "express";
import { prisma } from "../config/db";

export async function getDashboardMetrics(req: Request, res: Response, next: NextFunction) {
  try {
    const [totalRevenueResult, totalOrders, activeCakes, pendingDeliveries] = await Promise.all([
      prisma.order.aggregate({
        _sum: { total: true },
      }),
      prisma.order.count(),
      prisma.cake.count({ where: { isActive: true } }),
      prisma.order.count({ where: { status: { notIn: ["DELIVERED", "CANCELLED"] } } }),
    ]);

    return res.json({
      totalRevenue: totalRevenueResult._sum.total || 0,
      totalOrders,
      activeCakes,
      pendingDeliveries,
    });
  } catch (error) {
    next(error);
  }
}

export async function getRecentSales(req: Request, res: Response, next: NextFunction) {
  try {
    const orders = await prisma.order.findMany({
      take: 10,
      orderBy: { createdAt: "desc" },
      include: { items: true },
    });
    return res.json({ orders });
  } catch (error) {
    next(error);
  }
}

export async function getAdminCakes(req: Request, res: Response, next: NextFunction) {
  try {
    const { search } = req.query;
    const where: any = {};
    if (search) {
      where.OR = [
        { title: { contains: String(search), mode: "insensitive" } },
        { description: { contains: String(search), mode: "insensitive" } },
      ];
    }

    const cakes = await prisma.cake.findMany({
      where,
      include: { category: true },
      orderBy: { createdAt: "desc" },
    });

    return res.json({ cakes });
  } catch (error) {
    next(error);
  }
}

export async function createCake(req: Request, res: Response, next: NextFunction) {
  try {
    const { title, categoryId, price, discountPrice, description, images, isFeatured, stockStatus } = req.body;
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

    const cake = await prisma.cake.create({
      data: {
        title,
        slug,
        categoryId,
        price,
        discountPrice,
        description,
        images: images || ["/images/cake1.jpeg"],
        isFeatured: isFeatured || false,
        stockStatus: stockStatus || "IN_STOCK",
      },
    });

    return res.status(201).json({ cake });
  } catch (error) {
    next(error);
  }
}

export async function updateCake(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const cake = await prisma.cake.update({
      where: { id },
      data: req.body,
    });

    return res.json({ cake });
  } catch (error) {
    next(error);
  }
}

export async function deleteCake(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    await prisma.cake.delete({ where: { id } });
    return res.json({ message: "Cake deleted successfully" });
  } catch (error) {
    next(error);
  }
}

export async function uploadCakeImage(req: Request, res: Response) {
  // Cloudinary image upload placeholder / handler
  return res.json({ imageUrl: "/images/cake1.jpeg" });
}

export async function getAdminOrders(req: Request, res: Response, next: NextFunction) {
  try {
    const { status } = req.query;
    const where: any = {};
    if (status) {
      where.status = String(status);
    }

    const orders = await prisma.order.findMany({
      where,
      include: { items: true, statusHistory: true },
      orderBy: { createdAt: "desc" },
    });

    return res.json({ orders });
  } catch (error) {
    next(error);
  }
}

export async function updateOrderStatus(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await prisma.order.update({
      where: { id },
      data: {
        status,
        statusHistory: {
          create: {
            status,
          },
        },
      },
      include: { statusHistory: true },
    });

    return res.json({ order });
  } catch (error) {
    next(error);
  }
}
