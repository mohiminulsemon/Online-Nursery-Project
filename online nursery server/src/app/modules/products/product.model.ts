import { model, Schema } from "mongoose";
import { TProducts } from "./product.interface";

const ProductCreateSchema = new Schema<TProducts>({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  quantity: {
    type: Number,
    required: true,
  },
  inStock: {
    type: Boolean,
    default: true,
  },
  description: {
    type: String,
    required: [true, "description is required"],
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
  },
  rating: {
    type: Number,
    required: [true, "Rating is required"],
    default: 0,
  },
  category: {
    type: String,
    required: [true, "Category is required"],
  },
  imageUrl: {
    type: String,
    required: [true, "imageUrl is required"],
  },
});

export const Product = model<TProducts>("Product", ProductCreateSchema);
