import httpStatus from "http-status";
import { TCategory } from "./category.interface";
import { Category } from "./category.model";
import AppError from "../../errors/AppError";

const createCategoryIntoDB = async (payload: TCategory) => {
  return await Category.create(payload);
};

// get category
const getAllCategoryFromDB = async () => {
  return await Category.find();
};
// get single category
const getSingleCategoryFromDB = async (id: string) => {
  return await Category.findById(id);
};

// product category update
const updateCategoryIntoDB = async (
  id: string,
  payload: Partial<TCategory>
) => {
  const isExistsCategory = await Category.findById(id);
  if (!isExistsCategory) {
    throw new AppError(httpStatus.NOT_FOUND, "This Category is not found!");
  }

  return await Category.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
};

// delete category
const deleteCategoryFromDB = async (id: string) => {
  const isExistsCategory = await Category.findById(id);
  if (!isExistsCategory) {
    throw new AppError(httpStatus.NOT_FOUND, "This Category is not found!");
  }

  return await Category.findByIdAndDelete(id);
};

export const CategoryServices = {
  createCategoryIntoDB,
  getAllCategoryFromDB,
  getSingleCategoryFromDB,
  updateCategoryIntoDB,
  deleteCategoryFromDB,
};
