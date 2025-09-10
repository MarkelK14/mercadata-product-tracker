import cron from "node-cron";

import { fetchCategories,fetchProductsByCategory } from "./src/api/fetch-data.js";
import { saveOrUpdateCategory } from "./src/services/category.service.js";
import { saveOrUpdateSubcategories } from "./src/services/subcategory.service.js";
import { saveOrUpdateProduct } from "./src/services/product.service.js";
import { getSubcategoryIds } from "./src/repositories/subcategory.repository.js";

// Se ejecuta todos los días a las 5am
// cron.schedule("0 5 * * *", () => {
//   console.log("Ejecutando tarea programada...");
//   fetchData();
// });


async function fetchData() {
  try {
    // const categories = await fetchCategories();
    
    // for (const category of categories) {
    //   await saveOrUpdateCategory(category);
    // }

    const subcategoryIds = await getSubcategoryIds();

    for (const subcat of subcategoryIds) {

      const subcategoryData = await fetchProductsByCategory(subcat.subcategory_id);
      await saveOrUpdateSubcategories(subcategoryData);

    }

    const productIds = await getProductIds();

    for (const prodId of productIds) {

      const productData = await fetchProductById(prodId.product_id);
      // await saveOrUpdateProduct(productData);

    }

  } catch (err) {
    console.error("Error al obtener datos:", err.message);
  }
}

// Ejecutar una vez al arrancar
fetchData();