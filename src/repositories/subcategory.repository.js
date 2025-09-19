import { pool } from '../config/db.js';

export const upsertSubcategory = async (subcat, parentId) => {
  await pool.query(
    `INSERT INTO subcategories (subcategory_id, category_id, name, display_order, layout, published, is_extended)
     VALUES (?, ?, ?, ?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE name = VALUES(name), display_order = VALUES(display_order),
                             layout = VALUES(layout), published = VALUES(published),
                             is_extended = VALUES(is_extended), category_id = VALUES(category_id), is_active = TRUE`,
    [
      subcat.id,
      parentId,
      subcat.name,
      subcat.order,
      subcat.layout,
      subcat.published,
      subcat.is_extended,
    ]
  );
};