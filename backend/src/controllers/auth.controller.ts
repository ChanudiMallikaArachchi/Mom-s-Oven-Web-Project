import { Request, Response, NextFunction } from "express";
import { prisma } from "../config/db";
import { hashPassword, comparePassword } from "../utils/password";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../utils/jwt";

export async function register(req: Request, res: Response, next: NextFunction) {
  try {
    const { name, email, phone, password } = req.body;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: { code: "EMAIL_EXISTS", message: "Email already registered" } });
    }

    const passwordHash = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        phone,
        passwordHash,
      },
    });

    const accessToken = generateAccessToken({ userId: user.id, role: user.role });
    const refreshToken = generateRefreshToken({ userId: user.id, role: user.role });

    res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true, sameSite: "lax" });
    return res.status(201).json({
      message: "User registered successfully",
      accessToken,
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    next(error);
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password, rememberMe } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.passwordHash) {
      return res.status(400).json({ error: { code: "INVALID_CREDENTIALS", message: "Invalid email or password" } });
    }

    const isValid = await comparePassword(password, user.passwordHash);
    if (!isValid) {
      return res.status(400).json({ error: { code: "INVALID_CREDENTIALS", message: "Invalid email or password" } });
    }

    const accessToken = generateAccessToken({ userId: user.id, role: user.role });
    const refreshToken = generateRefreshToken({ userId: user.id, role: user.role }, rememberMe);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: rememberMe ? 30 * 24 * 60 * 60 * 1000 : 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({
      message: "Logged in successfully",
      accessToken,
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    next(error);
  }
}

export async function googleAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const { googleId, email, name } = req.body;

    let user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      user = await prisma.user.create({
        data: {
          name,
          email,
          googleId,
        },
      });
    }

    const accessToken = generateAccessToken({ userId: user.id, role: user.role });
    const refreshToken = generateRefreshToken({ userId: user.id, role: user.role });

    return res.json({
      accessToken,
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    next(error);
  }
}

export async function refreshToken(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.cookies?.refreshToken || req.body.refreshToken;
    if (!token) {
      return res.status(401).json({ error: { code: "NO_REFRESH_TOKEN", message: "Refresh token missing" } });
    }

    const payload = verifyRefreshToken(token);
    const accessToken = generateAccessToken({ userId: payload.userId, role: payload.role });

    return res.json({ accessToken });
  } catch (error) {
    next(error);
  }
}

export async function logout(req: Request, res: Response) {
  res.clearCookie("refreshToken");
  return res.json({ message: "Logged out successfully" });
}

export async function forgotPassword(req: Request, res: Response) {
  const { email } = req.body;
  // Send reset email logic
  return res.json({ message: `Password reset link sent to ${email} (if registered)` });
}

export async function resetPassword(req: Request, res: Response) {
  const { token, newPassword } = req.body;
  // Consume reset token logic
  return res.json({ message: "Password reset successfully" });
}
