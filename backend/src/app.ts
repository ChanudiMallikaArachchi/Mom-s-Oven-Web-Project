import express from "express";
import cors from "cors";
import { ENV } from "./config/env";
import apiRouter from "./routes";
import { errorHandler } from "./middlewares/error";

const app = express();

// Middleware
app.use(
  cors({
    origin: ENV.CLIENT_ORIGIN,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check
app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// API Routes
app.use("/api", apiRouter);

// Global Error Handler
app.use(errorHandler);

export default app;
