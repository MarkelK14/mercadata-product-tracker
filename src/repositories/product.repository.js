import { pool } from '../config/db.js';

export const findProductByEan = async (ean) => {
  const [rows] = await pool.query(
    'SELECT count(*) as count FROM products WHERE ean = ?',
    [ean]
  );
  return rows[0];
};

export const selectProductIds = async () => {
  const [result] = await pool.query('SELECT distinct product_id FROM product_subcategories');
  return result;
};

export const selectLastPriceRecord = async (product_id) => {
  const [rows] = await pool.query(
    'SELECT * FROM prices WHERE product_id = ? ORDER BY created_at DESC LIMIT 1',
    [product_id]
  );
  return rows[0];
};

export const insertProductId = async (productId, subcategory_id) => {
  await pool.query(
    'INSERT INTO product_subcategories (product_id, subcategory_id) VALUES (?, ?)',
    [productId, subcategory_id]
  );
};

export const selectProductPhotoByProductAndUrl = async (product_id, url) => {
  const [rows] = await pool.query(
    'SELECT count(*) as count FROM product_photos WHERE product_id = ? AND regular_url = ?',
    [product_id, url]
  );
  return rows[0];
};

export const insertProductPhotos = async (product_id, perspective, regular, thumbnail, zoom) => {
  await pool.query(
    'INSERT INTO product_photos (product_id, perspective, regular_url, thumbnail_url, zoom_url) VALUES (?, ?, ?, ?, ?)',
    [product_id, perspective, regular, thumbnail, zoom]
  );
};

export const setActiveProductPhotos = async (product_id, regular_url) => {
  await pool.query(
    'UPDATE product_photos SET is_active = TRUE WHERE product_id = ? and regular_url = ?',
    [product_id, regular_url]
  );
};

export const insertPriceHistory = async (product_id, unit_price, unit_name, reference_price, reference_format, total_units, unit_size, iva) => {
  await pool.query(
    `INSERT INTO prices (
      product_id, unit_price, unit_name, total_units, unit_size,
      reference_price, reference_format, iva
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [product_id, unit_price, unit_name, total_units, unit_size, reference_price, reference_format, iva]
  );
};

export const insertOrUpdateProduct = async (product) => {
  const {
    id,
    ean,
    slug,
    brand,
    origin,
    packaging,
    display_name,
    share_url,
    details,
    nutrition_information,
  } = product;

  await pool.query(
    `INSERT INTO products (
        product_id, ean, slug, brand, origin, packaging,
        display_name, legal_name, description,
        storage_instructions, mandatory_mentions,
        ingredients, allergens, share_url
     ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE
        ean = VALUES(ean),
        slug = VALUES(slug),
        brand = VALUES(brand),
        origin = VALUES(origin),
        packaging = VALUES(packaging),
        display_name = VALUES(display_name),
        legal_name = VALUES(legal_name),
        description = VALUES(description),
        storage_instructions = VALUES(storage_instructions),
        mandatory_mentions = VALUES(mandatory_mentions),
        ingredients = VALUES(ingredients),
        allergens = VALUES(allergens),
        share_url = VALUES(share_url),
        is_active = TRUE;`,
    [
      id,
      ean,
      slug,
      brand || details?.brand || null,
      origin || details?.origin || null,
      packaging,
      display_name,
      details?.legal_name || null,
      details?.description || null,
      details?.storage_instructions || null,
      details?.mandatory_mentions || null,
      nutrition_information?.ingredients || null,
      nutrition_information?.allergens || null,
      share_url,
    ]
  );
};