import { pool } from '../config/db.js';

export const upsertCategory = async (category) => {
  await pool.query(
    `INSERT INTO categories (category_id, name, display_order, is_extended)
     VALUES (?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE name = VALUES(name), display_order = VALUES(display_order), is_extended = VALUES(is_extended)`,
    [category.id, category.name, category.order, category.is_extended]
  );
};
