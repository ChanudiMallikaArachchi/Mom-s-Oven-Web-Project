import { Router } from "express";
import authRoutes from "./auth.routes";
import homeRoutes from "./home.routes";
import categoriesRoutes from "./categories.routes";
import cakesRoutes from "./cakes.routes";
import cartRoutes from "./cart.routes";
import ordersRoutes from "./orders.routes";
import usersRoutes from "./users.routes";
import adminRoutes from "./admin.routes";
import contactRoutes from "./contact.routes";

const apiRouter = Router();

apiRouter.use("/auth", authRoutes);
apiRouter.use("/home", homeRoutes);
apiRouter.use("/categories", categoriesRoutes);
apiRouter.use("/cakes", cakesRoutes);
apiRouter.use("/cart", cartRoutes);
apiRouter.use("/orders", ordersRoutes);
apiRouter.use("/users", usersRoutes);
apiRouter.use("/admin", adminRoutes);
apiRouter.use("/contact", contactRoutes);

export default apiRouter;
