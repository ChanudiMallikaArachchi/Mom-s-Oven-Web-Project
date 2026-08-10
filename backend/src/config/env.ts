import dotenv from "dotenv";

dotenv.config();

export const ENV = {
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || "development",
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || "http://localhost:3000",
  DATABASE_URL: process.env.DATABASE_URL || "",
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || "access_secret_2026",
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || "refresh_secret_2026",
  JWT_ACCESS_EXPIRES_IN: process.env.JWT_ACCESS_EXPIRES_IN || "15m",
  JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
  PAYMENT_PROVIDER: process.env.PAYMENT_PROVIDER || "STRIPE",
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY || "",
  PAYHERE_MERCHANT_ID: process.env.PAYHERE_MERCHANT_ID || "",
  PAYHERE_MERCHANT_SECRET: process.env.PAYHERE_MERCHANT_SECRET || "",
};
