import httpStatus from "http-status";
import { Product } from "../products/product.model";
import { TOrder } from "./order.interface";
import { Order } from "./order.model";
import AppError from "../../errors/AppError";

const createOrderIntoDB = async (payload: TOrder) => {
  const { productItem, ...orderDetails } = payload;

  for (const item of productItem) {
    const { _id: productId, quantity } = item;

    // Fetch the product 
    const findProduct = await Product.findById(productId);
    if (!findProduct) {
      throw new AppError(
        httpStatus.NOT_FOUND,
        `Product with ${productId} not found`
      );
    }
    if (findProduct.quantity < quantity) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        `Insufficient quantity for product ${findProduct.title}`
      );
    }
    // Create the order
    const createOrder = new Order(payload);
    await createOrder.save();

    // Update the  inventory
    findProduct.quantity -= quantity;
    findProduct.inStock = findProduct.quantity > 0;
    await findProduct.save();
  }
  const createOrder = new Order({ ...orderDetails, productItem });
  await createOrder.save();

  return createOrder;
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
