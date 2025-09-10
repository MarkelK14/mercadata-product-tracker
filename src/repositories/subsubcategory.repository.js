import { pool } from '../config/db.js';

export const upsertSubSubcategory = async (subcat, parentId) => {
  await pool.query(
    `INSERT INTO subsubcategories (subsubcategory_id, subcategory_id, name, display_order, layout, published, is_extended)
     VALUES (?, ?, ?, ?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE name = VALUES(name), display_order = VALUES(display_order),
                             layout = VALUES(layout), published = VALUES(published),
                             is_extended = VALUES(is_extended), subcategory_id = VALUES(subcategory_id)`,
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