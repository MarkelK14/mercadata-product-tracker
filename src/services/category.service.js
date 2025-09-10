import { upsertCategory } from "../repositories/category.repository.js";
import { upsertSubcategory } from "../repositories/subcategory.repository.js";

export const saveOrUpdateCategory = async (category) => {
  await upsertCategory(category);

  if (category.categories?.length) {
    for (const subcategory of category.categories) {
      await upsertSubcategory(subcategory, category.id);
    }
  }
};
