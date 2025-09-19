import { stripHtml } from "string-strip-html";
import dateUtils from '../utils/date.utils.js';

import { selectProductIds, insertOrUpdateProduct, insertProductPhotos, selectProductPhotoByProductAndUrl,insertPriceHistory, setActiveProductPhotos, selectLastPriceRecord } from "../repositories/product.repository.js";

export const saveOrUpdateProduct = async (product) => {

  try {
    product.nutrition_information.allergens = stripHtml(product.nutrition_information?.allergens || "").result;
    product.nutrition_information.ingredients = stripHtml(product.nutrition_information?.ingredients || "").result;
  
    await insertOrUpdateProduct(product);
  
    for (const photo of product.photos) {
  
      const productPhoto = await selectProductPhotoByProductAndUrl(product.id, photo?.regular);
  
      if (productPhoto.count > 0) {
        await setActiveProductPhotos(product.id, photo?.regular);
        continue; // Skip inserting if the photo already exists
      }
  
      await insertProductPhotos(
        product.id,
        photo.perspective,
        photo?.regular || null,
        photo?.thumbnail || null,
        photo?.zoom || null
      );
    }
  
    const lastPriceRecord = await selectLastPriceRecord(product.id);
  
    if (!Number.isInteger(product.id)) {
      console.warn(`Warning: product.id is not an integer: ${product.id}`);
    }
  
    if (
      lastPriceRecord &&
      lastPriceRecord.unit_price === (parseFloat(product.price_instructions.unit_price) || null) &&
      lastPriceRecord.unit_name === (product.price_instructions.unit_name || null) &&
      lastPriceRecord.reference_price === (parseFloat(product.price_instructions.reference_price) || null) &&
      lastPriceRecord.reference_format === (product.price_instructions.reference_format || null) &&
      lastPriceRecord.total_units === (product.price_instructions.total_units || null) &&
      lastPriceRecord.unit_size === (String(product.price_instructions.unit_size) || null) &&
      lastPriceRecord.iva === (product.price_instructions.iva || null)
    ) {
      // No changes in price, skip inserting a new record
      return;
    }
  
    // Ejemplo de uso:
    const unitPriceDecimal = isDecimal(parseFloat(product.price_instructions.unit_price));
    // Puedes usar unitPriceDecimal según lo necesites
    
    await insertPriceHistory(
      product.id,
      product.price_instructions.unit_price || null,
      product.price_instructions.unit_name || null,
      product.price_instructions.reference_price || null,
      product.price_instructions.reference_format || null,
      product.price_instructions.total_units || null,
      product.price_instructions.unit_size || null,
      product.price_instructions.iva || null
      );
  } catch (error) {
    console.error(`[${dateUtils.getDateTimeString()}] ❌ Error saving or updating product: ${product.id}`, error);
  }

};

export const getProductIds = async () => {
  const result = await selectProductIds();
  return result;
};


// export const update