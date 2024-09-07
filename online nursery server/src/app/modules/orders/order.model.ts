import { model, Schema } from "mongoose";
import { TOrder } from "./order.interface";

const ProductItemSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true },
  title: { type: String, required: true },
  category: { type: String, required: true },
  imageUrl: { type: String, required: true },
});

const OrderSchema = new Schema<TOrder>({
  productItem: {
    type: [ProductItemSchema],
    required: true,
  },
  name: { type: String, required: true },
  email: { type: String, required: true },
  userImage: { type: String, required: false },
  TotalPrice: { type: Number, required: true },
  phoneNumber: { type: String, required: true },
  company: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  postCode: { type: String, required: true },
  country: { type: String, required: true },
  CashOnDelivery: { type: Boolean, required: true, default: false },
  StripePayment: { type: Boolean, required: true, default: false },
});

export const Order = model<TOrder>("Order", OrderSchema);
