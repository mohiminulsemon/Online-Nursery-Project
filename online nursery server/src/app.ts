import cors from "cors";
import express, { Application, Request, Response } from "express";
import httpStatus from "http-status";
import { ProductRoutes } from "./app/modules/products/product.route";

const app: Application = express();

app.use(express.json());
app.use(cors());


app.use("/api/products", ProductRoutes);
// app.use("/api/categories", CategoryRouter);
// app.use("/api/orders", OrderRouter);

app.get("/", (req: Request, res: Response) => {
  res.status(httpStatus.OK).json({
    success: true,
    message: "Online Nursery Server is Running....",
  });
});

export default app;
