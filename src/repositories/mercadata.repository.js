import { pool } from '../config/db.js';

import dateUtils from '../utils/date.utils.js';

export const resetActiveFields = async () => {
    try {
    console.log(`[${dateUtils.getDateTimeString()}]⏳ Resetting is_active fields and tables...`);

        await pool.query("UPDATE sections SET is_active = FALSE;");
        await pool.query("UPDATE categories SET is_active = FALSE;");
        await pool.query("UPDATE subcategories SET is_active = FALSE;");
        await pool.query("UPDATE products SET is_active = FALSE;");
        await pool.query("UPDATE product_photos SET is_active = FALSE;");
            console.log(`[${dateUtils.getDateTimeString()}]✅ is_active fields and tables reset successfully.`);
    } catch (err) {
        console.error(`[${dateUtils.getDateTimeString()}]❌ Error resetting active fields:`, err);
        throw err;
    }
}

export const resetProductSucategories = async () => {
    try {
        console.log(`[${dateUtils.getDateTimeString()}]⏳ Resetting product_subcategories table...`);

        await pool.query("SET SQL_SAFE_UPDATES = 0;");

        await pool.query("DELETE FROM product_subcategories;");

        await pool.query("ALTER TABLE product_subcategories AUTO_INCREMENT = 1;");

        await pool.query("SET SQL_SAFE_UPDATES = 1;");

        console.log(`[${dateUtils.getDateTimeString()}]✅ product_subcategories table reset successfully.`);
    } catch (err) {
        console.error(`[${dateUtils.getDateTimeString()}] ❌ Error resetting database:`, err);
        throw err;
    }
};

export const resetDatabaseTables = async () => {
    try {
        console.log(`[${dateUtils.getDateTimeString()}] ⚡ Resetting tables...`);

        await pool.query("SET FOREIGN_KEY_CHECKS = 0;");

        await pool.query("TRUNCATE TABLE prices;");
        await pool.query("TRUNCATE TABLE product_photos;");
        await pool.query("TRUNCATE TABLE product_subcategories;");

        await pool.query("TRUNCATE TABLE products;");
        await pool.query("TRUNCATE TABLE subcategories;");
        await pool.query("TRUNCATE TABLE categories;");
        await pool.query("TRUNCATE TABLE sections;");

        await pool.query("SET FOREIGN_KEY_CHECKS = 1;");

        console.log(`[${dateUtils.getDateTimeString()}]✅ Tables reset successfully.`);
    } catch (err) {
        console.error(`[${dateUtils.getDateTimeString()}] ❌ Error resetting database tables:`, err);
        throw err;
    }
};
