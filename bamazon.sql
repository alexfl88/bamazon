DROP DATABASE IF EXISTS bamazon_DB;

CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products (
item_id INTEGER AUTO_INCREMENT NOT NULL,
product_name VARCHAR(50),
department_name VARCHAR(30),
price INTEGER(10),
stock_quantity INTEGER(10),
PRIMARY KEY(item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES
("iPhone Charger", "Electronics", 25, 50),
("Airpods", "Electronics", 200, 40),
("Amazon Echo", "Electronics", 100, 20),
("Amazon Fire TV Stick", "Electronics", 35, 25),
("Basketball", "Sports", 30, 12),
("Elliptical Machine", "Sports", 130, 8),
("Xbox One S", "Video Games", 149, 18),
("Bose Headphones", "Electronics", 279, 12),
("Men's Adidas Sneakers", "Clothing", 45, 14),
("Organic Grapes", "Groceries", 4, 200);