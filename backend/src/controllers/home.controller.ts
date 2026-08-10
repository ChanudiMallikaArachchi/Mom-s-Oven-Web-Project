import { Request, Response, NextFunction } from "express";
import { prisma } from "../config/db";

export async function getFeaturedCakes(req: Request, res: Response, next: NextFunction) {
  try {
    const cakes = await prisma.cake.findMany({
      where: { isFeatured: true, isActive: true },
      take: 8,
    });
    return res.json({ cakes });
  } catch (error) {
    next(error);
  }
}

export async function getTestimonials(req: Request, res: Response, next: NextFunction) {
  try {
    const testimonials = await prisma.testimonial.findMany({
      where: { isPublished: true },
      orderBy: { createdAt: "desc" },
    });
    return res.json({ testimonials });
  } catch (error) {
    next(error);
  }
}
