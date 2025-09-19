import cron from "node-cron";

import dateUtils from "./src/utils/date.utils.js";
import { fetchSections,fetchProductsByCategory, fetchProductById } from "./src/api/fetch-data.js";
import { saveOrUpdateSectionsAndCategories } from "./src/services/section.service.js";
import { saveOrUpdateSubcategoriesAndProductIds } from "./src/services/category.service.js";
import { saveOrUpdateProduct } from "./src/services/product.service.js";
import { getCategoryIds } from "./src/repositories/category.repository.js";
import { getProductIds } from "./src/services/product.service.js";
import { resetActiveFields, resetProductSucategories, resetDatabaseTables } from "./src/repositories/mercadata.repository.js";

// Se ejecuta todos los días a las 5am
// cron.schedule("0 5 * * *", () => {
//   console.log("Ejecutando tarea programada...");
//   fetchData();
// });


async function fetchData() {
  try {

    console.log(`[${dateUtils.getDateTimeString()}] Fetching and storing data for the first time...`);
    
    await resetDatabaseTables();
    
    console.log(`[${dateUtils.getDateTimeString()}]⏳ Fetching data...`);

    // Get all sections and categories
    const sections = await fetchSections();
    for (const section of sections) {
      await saveOrUpdateSectionsAndCategories(section);
    }

    console.log(`[${dateUtils.getDateTimeString()}]✅ Sections and categories fetched and stored successfully.`);
    console.log(`[${dateUtils.getDateTimeString()}]⏳ Fetching subcategories and products...`);

    // Get all categories and product IDs
    const categoryIds = await getCategoryIds();
    for (const cat of categoryIds) {
      const categoryData = await fetchProductsByCategory(cat.category_id);
      await saveOrUpdateSubcategoriesAndProductIds(categoryData);
    }

    console.log(`[${dateUtils.getDateTimeString()}]✅ Subcategories and products fetched and stored successfully.`);
    console.log(`[${dateUtils.getDateTimeString()}]⏳ Fetching product details...`);

    // Get all product details
    const productIds = await getProductIds();
    for (const prod of productIds) {
      const productData = await fetchProductById(prod.product_id);
      await saveOrUpdateProduct(productData);
    }

    console.log(`[${dateUtils.getDateTimeString()}]✅ Product details fetched and stored successfully.`);
    console.log(`[${dateUtils.getDateTimeString()}]✅ Data fetched and stored successfully.`);
    console.log(`[${dateUtils.getDateTimeString()}] Data fetch process completed.`);
  } catch (err) {
    console.error(`[${dateUtils.getDateTimeString()}] ❌ Error fetching data:`, err.message);
  }
}

const updateCatalog = async () => {
  try {
    console.log(`[${dateUtils.getDateTimeString()}]⏳ Updating product catalog...`);

    await resetActiveFields();
    await resetProductSucategories();

    console.log(`[${dateUtils.getDateTimeString()}]⏳ Fetching sections and categories...`);
    // Get all sections and categories
    const sections = await fetchSections();
    for (const section of sections) {
      await saveOrUpdateSectionsAndCategories(section);
    }

    console.log(`[${dateUtils.getDateTimeString()}]✅ Sections and categories fetched and stored successfully.`);
    console.log(`[${dateUtils.getDateTimeString()}]⏳ Fetching subcategories and products...`);

    // Get all categories and product IDs
    const categoryIds = await getCategoryIds();
    for (const cat of categoryIds) {
      const categoryData = await fetchProductsByCategory(cat.category_id);
      await saveOrUpdateSubcategoriesAndProductIds(categoryData);
    }

    console.log(`[${dateUtils.getDateTimeString()}]✅ Subcategories and products fetched and stored successfully.`);
    console.log(`[${dateUtils.getDateTimeString()}]⏳ Fetching product details...`);

    // Get all product details
    const productIds = await getProductIds();
    for (const prod of productIds) {
      const productData = await fetchProductById(prod.product_id);
      await saveOrUpdateProduct(productData);
    }

    console.log(`[${dateUtils.getDateTimeString()}]✅ Product details fetched and stored successfully.`);
    console.log(`[${dateUtils.getDateTimeString()}]✅ Product catalog updated successfully.`);
  } catch (err) {
    console.error(`[${dateUtils.getDateTimeString()}] ❌ Error updating catalog:`, err.message);
  }
}

// Ejecutar una vez al arrancar
// fetchData();
updateCatalog();