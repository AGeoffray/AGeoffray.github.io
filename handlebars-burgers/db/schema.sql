DROP DATABASE IF EXISTS burgers_db;

USE DATABASE burgers_db;

CREATE TABLE burgers (
    id INT AUTO_INCREMENT NOT NULL,
    burger_name VARCHAR(100) NOT NULL,
    devoured BOOLEAN,
    PRIMARY KEY (id);
);

-- 0 is false, 1 is true in sql booleans