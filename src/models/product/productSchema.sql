CREATE TABLE products (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    categoryId INT,
    description VARCHAR(255),
    price INT NOT NULL,
    active BOOLEAN DEFAULT 'true',
    PRIMARY KEY (id),
    FOREIGN KEY (categoryId)
        REFERENCES categories(id)
);