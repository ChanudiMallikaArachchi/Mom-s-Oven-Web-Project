import app from "./app";
import { ENV } from "./config/env";
import { prisma } from "./config/db";

const PORT = ENV.PORT;

async function startServer() {
  try {
    await prisma.$connect();
    console.log("⚡ Connected to PostgreSQL database via Prisma");

    app.listen(PORT, () => {
      console.log(`🎂 Mom's Oven Backend API running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
