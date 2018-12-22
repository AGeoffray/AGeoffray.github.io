DROP DATABASE IF EXISTS friend_finder;

CREATE DATABASE friend_finder;

USE friend_finder;

CREATE TABLE friends (
id INT auto_increment NOT NULL,
name VARCHAR(100) NOT NULL,
photo VARCHAR(255) NOT NULL,
score01 INT NOT NULL,
score02 INT NOT NULL,
score03 INT NOT NULL,
score04 INT NOT NULL,
score05 INT NOT NULL,
score06 INT NOT NULL,
score07 INT NOT NULL,
score08 INT NOT NULL,
score09 INT NOT NULL,
score10 INT NOT NULL,
PRIMARY KEY (id)
);
