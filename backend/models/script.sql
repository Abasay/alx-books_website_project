CREATE DATABASE IF NOT EXISTS book_rec_db;
CREATE USER IF NOT EXISTS 'mike'@'localhost' IDENTIFIED BY 'alx';
GRANT ALL PRIVILEGES ON `book_rec_db`.* TO 'mike'@'localhost';
FLUSH PRIVILEGES;
