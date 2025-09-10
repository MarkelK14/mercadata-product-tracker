import { upsertSubSubcategory } from "../repositories/subsubcategory.repository.js";
import { truncateProducts, insertProductId } from "../repositories/product.repository.js";

export const saveOrUpdateSubcategories = async (subcategory) => {

  // await truncateProducts();

  if (subcategory.categories?.length) {
    for (const subsubcategory of subcategory.categories) {
      await upsertSubSubcategory(subsubcategory, subcategory.id);

      if (subsubcategory.products?.length) {
        for(const product of subsubcategory.products) {
          await insertProductId(product.id);
        }
      }

    }
  }
};
