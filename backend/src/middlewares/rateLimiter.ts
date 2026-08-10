import rateLimit from "express-rate-limit";

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // 10 attempts
  message: {
    error: {
      code: "TOO_MANY_REQUESTS",
      message: "Too many login attempts, please try again after 15 minutes.",
    },
  },
});

export const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // 5 messages
  message: {
    error: {
      code: "TOO_MANY_REQUESTS",
      message: "Too many contact messages sent, please try again later.",
    },
  },
});
