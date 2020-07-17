-- Creation of our database.
CREATE DATABASE mainDatabase; 

-- Selecting the database.
USE mainDatabase;

-- TABLE to store the users.
CREATE TABLE users(
    id INT(10) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(50) NOT NULL,
    fullname VARCHAR(50) NOT NULL,
    password VARCHAR(30) NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp
);

-- Check if the table structure is correct.
DESCRIBE users;