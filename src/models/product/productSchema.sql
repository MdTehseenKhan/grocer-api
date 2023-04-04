CREATE TABLE products (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    image VARCHAR(255),
    description VARCHAR(255),
    price INT NOT NULL,
    categoryId INT,
    active BOOLEAN DEFAULT true,
    PRIMARY KEY (id),
    UNIQUE (name),
    FOREIGN KEY (categoryId)
        REFERENCES categories(id)
);