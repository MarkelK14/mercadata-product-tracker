import { stripHtml } from "string-strip-html";

import { selectProductIds, insertOrUpdateProduct, insertProductPhotos,insertPriceHistory, selectLastPriceRecord } from "../repositories/product.repository.js";

export const saveOrUpdateProduct = async (product) => {

  product.nutrition_information.allergens = stripHtml(product.nutrition_information?.allergens || "").result;
  product.nutrition_information.ingredients = stripHtml(product.nutrition_information?.ingredients || "").result;

  await insertOrUpdateProduct(product);

  for (const photo of product.photos) {
    await insertProductPhotos(
      product.id,
      photo.perspective,
      photo?.regular || null,
      photo?.thumbnail || null,
      photo?.zoom || null
    );
  }

  const lastPriceRecord = await selectLastPriceRecord(product.id);

  if (
    lastPriceRecord &&
    lastPriceRecord.unit_price === (product.price_instructions.unit_price || null) &&
    lastPriceRecord.bulk_price === (product.price_instructions.bulk_price || null) &&
    lastPriceRecord.reference_price === (product.price_instructions.reference_price || null) &&
    lastPriceRecord.reference_format === (product.price_instructions.reference_format || null) &&
    lastPriceRecord.iva === (product.price_instructions.iva || null)
  ) {
    // No changes in price, skip inserting a new record
    return;
  }

  await insertPriceHistory(
    product.id,
    product.price_instructions.unit_price || null,
    product.price_instructions.unit_name || null,
    product.price_instructions.total_units || null,
    product.price_instructions.unit_size || null,
    product.price_instructions.reference_price || null,
    product.price_instructions.reference_format || null,
    product.price_instructions.iva || null
    );

};

export const getProductIds = async () => {
  const result = await selectProductIds();
  return result;
};