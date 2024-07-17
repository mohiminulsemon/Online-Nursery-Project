import { model, Schema } from "mongoose";
import { TOrder } from "./order.interface";

const OrderSchema = new Schema<TOrder>({
  productItem: {
    type: [
      {
        _id: String,
        quantity: Number,
        title: String,
        category: String,
        imageUrl: String,
      },
    ],
    required: true,
  },
  name: { type: String, required: true },
  email: { type: String, required: true },
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
