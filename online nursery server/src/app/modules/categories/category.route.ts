import express from "express";
import { CategoryControllers } from "./category.controller";

const router = express.Router();

router.post("/create-category", CategoryControllers.createCategory);
router.get("/", CategoryControllers.getAllCategory);
router.get("/:categoryId", CategoryControllers.getSingleCategory);
router.patch("/:categoryId", CategoryControllers.updateCategory);
router.delete("/:categoryId", CategoryControllers.deleteCategory);

export const CategoryRoutes = router;
