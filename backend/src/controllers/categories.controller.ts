import { Request, Response, NextFunction } from "express";
import { prisma } from "../config/db";

export async function getCategories(req: Request, res: Response, next: NextFunction) {
  try {
    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: { cakes: true },
        },
      },
    });
    return res.json({ categories });
  } catch (error) {
    next(error);
  }
}

export async function getCategoryBySlug(req: Request, res: Response, next: NextFunction) {
  try {
    const { slug } = req.params;
    const { sort, minPrice, maxPrice } = req.query;

    const category = await prisma.category.findUnique({
      where: { slug },
    });

    if (!category) {
      return res.status(404).json({ error: { code: "NOT_FOUND", message: "Category not found" } });
    }

    const where: any = {
      categoryId: category.id,
      isActive: true,
    };

    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price.gte = Number(minPrice);
      if (maxPrice) where.price.lte = Number(maxPrice);
    }

    let orderBy: any = { createdAt: "desc" };
    if (sort === "price_asc") orderBy = { price: "asc" };
    if (sort === "price_desc") orderBy = { price: "desc" };

    const cakes = await prisma.cake.findMany({
      where,
      orderBy,
    });

    return res.json({ category, cakes });
  } catch (error) {
    next(error);
  }
}
