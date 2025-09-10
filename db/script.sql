-- =====================================
-- CREATE DATABASE
-- =====================================
DROP DATABASE IF EXISTS mercadata;
CREATE DATABASE IF NOT EXISTS mercadata
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_general_ci;

USE mercadata;

-- =====================================
-- DROP TABLES IF EXIST (reset)
-- =====================================
DROP TABLE IF EXISTS newsletter_logs;
DROP TABLE IF EXISTS newsletter_subscriptions;
DROP TABLE IF EXISTS list_products;
DROP TABLE IF EXISTS lists;
DROP TABLE IF EXISTS prices;
DROP TABLE IF EXISTS product_photos;
DROP TABLE IF EXISTS product_subcategories;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS subcategories;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS sections;
DROP TABLE IF EXISTS users;

-- =====================================
-- USERS
-- =====================================
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(100),
    password_hash VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================
-- SECTIONS & CATEGORIES
-- =====================================
CREATE TABLE sections (
    section_id INT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    display_order INT,
    is_extended BOOLEAN DEFAULT FALSE
);

CREATE TABLE categories (
    category_id INT PRIMARY KEY,
    section_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    display_order INT,
    layout INT,
    published BOOLEAN DEFAULT TRUE,
    is_extended BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (section_id) REFERENCES sections(section_id) ON DELETE CASCADE
);

CREATE TABLE subcategories (
    subcategory_id INT PRIMARY KEY,
    category_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    display_order INT,
    layout INT,
    published BOOLEAN DEFAULT TRUE,
    is_extended BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (category_id) REFERENCES categories(category_id) ON DELETE CASCADE
);

-- =====================================
-- PRODUCTS
-- =====================================
CREATE TABLE products (
    product_id FLOAT PRIMARY KEY,
    ean VARCHAR(50),
    slug VARCHAR(255),
    brand VARCHAR(255),
    origin VARCHAR(255),
    packaging VARCHAR(255),
    display_name VARCHAR(255),
    legal_name TEXT,
    description TEXT,
    storage_instructions TEXT,
    mandatory_mentions TEXT,
    ingredients TEXT,
    allergens TEXT,
    share_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================
-- PRODUCT PHOTOS (1:N relation)
-- =====================================
CREATE TABLE product_photos (
    photo_id INT AUTO_INCREMENT PRIMARY KEY,
    product_id FLOAT NOT NULL,
    zoom_url TEXT,
    regular_url TEXT,
    thumbnail_url TEXT,
    perspective INT,
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE
);

-- =====================================
-- PRODUCT-SUBCATEGORY RELATION (many-to-many)
-- =====================================
CREATE TABLE product_subcategories (
    product_id FLOAT NOT NULL,
    subcategory_id INT NOT NULL,
    PRIMARY KEY (product_id, subcategory_id)
    -- no foreign keys to allow inserts without strict dependency
);

-- =====================================
-- PRICES (historical)
-- =====================================
CREATE TABLE prices (
    price_id INT AUTO_INCREMENT PRIMARY KEY,
    product_id FLOAT NOT NULL,
    unit_price FLOAT,
    unit_name VARCHAR(50),
    reference_price FLOAT,
    reference_format VARCHAR(50),
    total_units INT,
    unit_size VARCHAR(50),
    iva FLOAT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE
);

-- =====================================
-- LISTS (user-created)
-- =====================================
CREATE TABLE lists (
    list_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE list_products (
    list_id INT NOT NULL,
    product_id FLOAT NOT NULL,
    PRIMARY KEY (list_id, product_id),
    FOREIGN KEY (list_id) REFERENCES lists(list_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE
);

-- =====================================
-- NEWSLETTER
-- =====================================
CREATE TABLE newsletter_subscriptions (
    subscription_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE newsletter_logs (
    log_id INT AUTO_INCREMENT PRIMARY KEY,
    subscription_id INT NOT NULL,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    subject VARCHAR(255),
    FOREIGN KEY (subscription_id) REFERENCES newsletter_subscriptions(subscription_id) ON DELETE CASCADE
);
