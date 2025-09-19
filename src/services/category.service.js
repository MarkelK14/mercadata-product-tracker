import { upsertSubcategory } from "../repositories/subcategory.repository.js";
import { insertProductId } from "../repositories/product.repository.js";

export const saveOrUpdateSubcategoriesAndProductIds = async (category) => {

  // await truncateProducts();

  if (category.categories?.length) {
    for (const subcategory of category.categories) {
      await upsertSubcategory(subcategory, category.id);

      if (subcategory.products?.length) {
        for(const product of subcategory.products) {

          try {
            await insertProductId(product.id, subcategory.id);
          } catch (error) {
            console.error('Error inserting product ID:', error);
            throw error;
          }
        }
      }

    }
  }
};
