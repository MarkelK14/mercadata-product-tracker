import { pool } from '../config/db.js';

export const upsertCategory = async (category, parentId) => {
  await pool.query(
    `INSERT INTO categories (category_id, section_id, name, display_order, layout, published, is_extended)
     VALUES (?, ?, ?, ?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE name = VALUES(name), display_order = VALUES(display_order),
                             layout = VALUES(layout), published = VALUES(published),
                             is_extended = VALUES(is_extended), section_id = VALUES(section_id), is_active = TRUE`,
    [
      category.id,
      parentId,
      category.name,
      category.display_order,
      category.layout,
      category.published,
      category.is_extended,
    ]
  );
};

export const getCategoryIds = async () => {
  const [result] = await pool.query('SELECT distinct category_id FROM categories');
  return result;
};