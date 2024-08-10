import express from "express";
import { OrderControllers } from "./order.controller";

const router = express.Router();

router.post("/create-order", OrderControllers.createOrder);
router.get("/", OrderControllers.getOrder);

export const  OrderRoutes = router;
