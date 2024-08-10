import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { OrderServices } from "./order.service";

const createOrder = catchAsync(async (req, res) => {
  const body = req.body;
  const result = await OrderServices.createOrderIntoDB(body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order is successfully created ",
    data: result,
  });
});
const getOrder = catchAsync(async (req, res) => {
  const result = await OrderServices.getAllOrdersFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order is successfully fetched ",
    data: result,
  });
});

export const OrderControllers = {
  createOrder,
  getOrder,
};
