import httpStatus from "http-status";
import { Product } from "../products/product.model";
import { TOrder } from "./order.interface";
import { Order } from "./order.model";
import AppError from "../../errors/AppError";
import mongoose from "mongoose";

const createOrderIntoDB = async (payload: TOrder) => {
  const { productItem, ...orderDetails } = payload;

  try {
    for (const item of productItem) {
      const { _id: productId, quantity } = item;

      // Fetch the product
      const findProduct = await Product.findById(productId);
      if (!findProduct) {
        throw new AppError(
          httpStatus.NOT_FOUND,
          `Product with ID ${productId} is not found`
        );
      }
      if (findProduct.quantity < quantity) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          `Insufficient quantity for the product ${findProduct.title}`
        );
      }

      // Update the inventory
      findProduct.quantity -= quantity;
      findProduct.inStock = findProduct.quantity > 0;
      await findProduct.save();

      console.log(`Updated inventory for product: ${findProduct.title}`);
    }

    // Create and save the order
    const createOrder = new Order({ ...orderDetails, productItem });
    await createOrder.save();

    console.log("Order saved successfully");

    return createOrder;
  } catch (error) {
    console.error("Error during order creation:", error);
    throw error;
  }
};



// get all orders
const getAllOrdersFromDB = async () => {
  const result = await Order.find();
  return result;
};
export const OrderServices = {
  createOrderIntoDB,
  getAllOrdersFromDB,
};
