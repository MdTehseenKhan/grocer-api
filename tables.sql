USE grocer_db;

-- User Schema
CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(255) DEFAULT 'customer',
    PRIMARY KEY (id)
);

-- Category Schema
CREATE TABLE categories (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL UNIQUE,
    PRIMARY KEY (id)
);

-- Products Schema
CREATE TABLE products (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL UNIQUE,
    image VARCHAR(255),
    description VARCHAR(255),
    price INT NOT NULL,
    categoryId INT,
    active BOOLEAN DEFAULT true,
    PRIMARY KEY (id),
    FOREIGN KEY (categoryId)
        REFERENCES categories(id)
);


-- DATA ENTRY

-- Admin
INSERT INTO users(name, email, password, role)
VALUES  ('', '', '', 'admin');

-- Normal Users
INSERT INTO users(name, email, password)
VALUES  ('', '', '')
        ('', '', '')
;

-- Categories
INSERT INTO categories(name)
VALUES  ('')
        ('')
;

-- Products
INSERT INTO products (name, image, categoryId, description, price, active)
VALUES  ('', '', '', '', '', '')
        ('', '', '', '', '', '')
;