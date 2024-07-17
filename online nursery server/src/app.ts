import cors from "cors";
import express, { Application, Request, Response } from "express";
import httpStatus from "http-status";
import { ProductRoutes } from "./app/modules/products/product.route";
import { OrderRoutes } from "./app/modules/orders/order.route";
import { CategoryRoutes } from "./app/modules/categories/category.route";

const app: Application = express();

app.use(express.json());
app.use(cors());


app.use("/api/products", ProductRoutes);
app.use("/api/categories", CategoryRoutes);
app.use("/api/orders", OrderRoutes);

app.get("/", (req: Request, res: Response) => {
  res.status(httpStatus.OK).json({
    success: true,
    message: "Online Nursery Server is Running....",
  });
});

export default app;
