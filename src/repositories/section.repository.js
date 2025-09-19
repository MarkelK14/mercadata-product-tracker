import { pool } from '../config/db.js';

export const upsertSection = async (section) => {
  await pool.query(
    `INSERT INTO sections (section_id, name, display_order, is_extended)
     VALUES (?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE name = VALUES(name), display_order = VALUES(display_order), is_extended = VALUES(is_extended), is_active = TRUE;`,
    [section.id, section.name, section.order, section.is_extended]
  );
};
