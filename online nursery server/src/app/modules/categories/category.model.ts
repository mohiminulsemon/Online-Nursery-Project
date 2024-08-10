import { model, Schema } from "mongoose";
import { TCategory } from "./category.interface";

const CategorySchema = new Schema<TCategory>({
  name: {
    type: String,
    required: [true, "Category name Required"],
  },
  description: {
    type: String,
    required: [true, "Category description Required"],
  },
});

export const Category = model<TCategory>("Category", CategorySchema);
