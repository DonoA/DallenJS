CREATE DATABASE dallenjs;
CREATE USER 'dallenjs'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON dallenjs . * TO 'dallenjs'@'localhost';
FLUSH PRIVILEGES;
