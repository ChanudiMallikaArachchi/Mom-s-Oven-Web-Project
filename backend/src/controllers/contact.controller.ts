import { Request, Response, NextFunction } from "express";

export async function submitContactForm(req: Request, res: Response, next: NextFunction) {
  try {
    const { name, email, phone, subject, message } = req.body;

    // Send email notification or save contact log
    console.log(`[Contact Form Submission] From ${name} (${email}): ${subject} - ${message}`);

    return res.status(201).json({
      message: "Thank you for reaching out to Mom's Oven. We will get back to you shortly!",
    });
  } catch (error) {
    next(error);
  }
}
