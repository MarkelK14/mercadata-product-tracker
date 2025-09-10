import cron from "node-cron";

import { fetchSections,fetchProductsByCategory, fetchProductById } from "./src/api/fetch-data.js";
import { saveOrUpdateSectionsAndCategories } from "./src/services/section.service.js";
import { saveOrUpdateSubcategoriesAndProductIds } from "./src/services/category.service.js";
import { saveOrUpdateProduct } from "./src/services/product.service.js";
import { getCategoryIds } from "./src/repositories/category.repository.js";
import { getProductIds } from "./src/services/product.service.js";

// Se ejecuta todos los días a las 5am
// cron.schedule("0 5 * * *", () => {
//   console.log("Ejecutando tarea programada...");
//   fetchData();
// });


async function fetchData() {
  try {

    // Get all sections and categories
    const sections = await fetchSections();
    for (const section of sections) {
      await saveOrUpdateSectionsAndCategories(section);
    }

    // Get all categories and product IDs
    const categoryIds = await getCategoryIds();
    for (const cat of categoryIds) {
      const categoryData = await fetchProductsByCategory(cat.category_id);
      await saveOrUpdateSubcategoriesAndProductIds(categoryData);
    }

    // Get all product details
    const productIds = await getProductIds();
    for (const prod of productIds) {
      const productData = await fetchProductById(prod.product_id);
      await saveOrUpdateProduct(productData);
    }

  } catch (err) {
    console.error("Error al obtener datos:", err.message);
  }
}

// Ejecutar una vez al arrancar
fetchData();