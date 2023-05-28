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
VALUES  ('', '', ''),
        ('', '', '')
;

-- Categories
INSERT INTO categories(name)
VALUES  ("Vegetables"),
        ("Fruits"),
        ("Milk"),
        ("Breads"),
        ("Eggs"),
        ("Cream"),
        ("Butter"),
        ("Cereal & Oats"),
        ("Cake & Rusk"),
        ("Cheese"),
        ("Yogurt"),
        ("Oil"),
        ("Daalain"),
        ("Spices & Herbs"),
        ("Flour"),
        ("Jams"),
        ("Sauces"),
        ("Desserts"),
        ("Olives"),
        ("Pickels"),
        ("Mutton"),
        ("Beef"),
        ("Chicken"),
        ("Fish"),
        ("Biscuits"),
        ("Noodles"),
        ("Chocolates"),
        ("Nimko"),
        ("Tea"),
        ("Cold Drinks"),
        ("Sharbat"),
        ("Juices"),
        ("Energy Drinks"),
        ("Instant Drinks"),
        ("Cleaners"),
        ("Detergents"),
        ("Tissue"),
        ("Repellents"),
        ("Laundry"),
        ("Shampoo"),
        ("Conditioner"),
        ("Female Hygiene"),
        ("Soap"),
        ("Body Spray"),
        ("Hand Wash"),
        ("Lotion"),
        ("Creams"),
        ("Razors"),
        ("Gel"),
        ("Diapers"),
        ("Lotions"),
        ("Baby Food"),
        ("Peanuts"),
        ("cashew nuts"),
        ("almonds"),
        ("Burger Pattie"),
        ("Nuggets"),
        ("Kabab"),
        ("Frozen Desserts")
;

-- Products
INSERT INTO products (name, image, categoryId, description, price, active)
VALUES  ('', '', '', '', '', ''),
        ('', '', '', '', '', '')
;