import { upsertSection } from "../repositories/section.repository.js";
import { upsertCategory } from "../repositories/category.repository.js";

export const saveOrUpdateSectionsAndCategories = async (section) => {
  await upsertSection(section);

  if (section.categories?.length) {
    for (const category of section.categories) {
      await upsertCategory(category, section.id);
    }
  }
};
