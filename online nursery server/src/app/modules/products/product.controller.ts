import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ProductServices } from "./product.services";

// create product
const createProduct = catchAsync(async (req, res) => {
  const result = await ProductServices.createProductIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product is successfully created ",
    data: result,
  });
});

// get all Products
const getAllProduct = catchAsync(async (req, res) => {
  const result = await ProductServices.getAllProductFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Products are successfully fetched ",
    data: result,
  });
});
// get single Products
const getSingleProduct = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const result = await ProductServices.getSingleProductFromDB(productId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product is successfully fetched ",
    data: result,
  });
});

// updated product
const updateProduct = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const body = req.body;
  const result = await ProductServices.updateProductIntoDB(productId, body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product is successfully updated",
    data: result,
  });
});

// Deleted Products
const deleteProduct = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const result = await ProductServices.deleteProductFromDB(productId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product successfully Deleted ",
    data: result,
  });
});

export const ProductControllers = {
  createProduct,
  getAllProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
