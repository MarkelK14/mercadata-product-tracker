import { pool } from '../config/db.js';

// Buscar producto por EAN
export const findProductByEan = async (ean) => {
  const [rows] = await pool.query(
    'SELECT count(*) as count FROM products WHERE ean = ?',
    [ean]
  );
  return rows[0];
};

export const getProductIds = async () => {
  const [result] = await pool.query('SELECT distinct product_id FROM products');
  return result;
};

export const truncateProducts = async () => {
  await pool.query('TRUNCATE TABLE products');
};

export const insertProductId = async (productId) => {
  await pool.query(
    'INSERT INTO products (product_id) VALUES (?)',
    [productId]
  );
};



// Actualizar producto por product_id
export const updateProduct = async (product) => {
  await pool.query(
    `UPDATE products SET
       ean = ?,
       slug = ?,
       brand = ?,
       origin = ?,
       packaging = ?,
       display_name = ?,
       legal_name = ?,
       description = ?,
       storage_instructions = ?,
       mandatory_mentions = ?,
       ingredients = ?,
       allergens = ?,
       photo_url = ?,
       share_url = ?,
       subsubcategory_id = ?
     WHERE product_id = ?`,
    [
      product.ean,
      product.slug,
      product.brand,
      product.origin,
      product.packaging,
      product.display_name,
      product.legal_name,
      product.description,
      product.storage_instructions,
      product.mandatory_mentions,
      product.ingredients,
      product.allergens,
      product.photo_url,
      product.share_url,
      product.subsubcategory_id,
      product.product_id
    ]
  );
};