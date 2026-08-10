import { Request, Response, NextFunction } from "express";
import { prisma } from "../config/db";

export async function getCakeById(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const cake = await prisma.cake.findUnique({
      where: { id },
      include: { category: true },
    });

    if (!cake) {
      return res.status(404).json({ error: { code: "NOT_FOUND", message: "Cake not found" } });
    }

    return res.json({ cake });
  } catch (error) {
    next(error);
  }
}

export async function getCakes(req: Request, res: Response, next: NextFunction) {
  try {
    const { search, category, page = 1, limit = 10 } = req.query;

    const where: any = { isActive: true };

    if (search) {
      where.OR = [
        { title: { contains: String(search), mode: "insensitive" } },
        { description: { contains: String(search), mode: "insensitive" } },
      ];
    }

    if (category) {
      where.category = { slug: String(category) };
    }

    const take = Number(limit);
    const skip = (Number(page) - 1) * take;

    const [cakes, total] = await Promise.all([
      prisma.cake.findMany({
        where,
        take,
        skip,
        orderBy: { createdAt: "desc" },
      }),
      prisma.cake.count({ where }),
    ]);

    return res.json({
      cakes,
      pagination: {
        page: Number(page),
        limit: take,
        total,
        totalPages: Math.ceil(total / take),
      },
    });
  } catch (error) {
    next(error);
  }
}
