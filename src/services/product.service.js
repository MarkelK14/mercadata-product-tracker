import { updateProduct } from "../repositories/product.repository.js";

export const saveOrUpdateProduct = async (product) => {
  await updateProduct(product);
};

export const selectSubcategoryIds = async () => {
  const result = await getSubcategoryIds();
  return result;
};