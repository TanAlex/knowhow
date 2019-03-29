CREATE DATABASE knowhow;
USE knowhow;

CREATE TABLE IF NOT EXISTS category (
    id INT AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    status TINYINT DEFAULT 1,
    description TEXT,
    PRIMARY KEY (id)
)  ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS article (
    id INT AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    status TINYINT DEFAULT 1,
    create_date TIMESTAMP  DEFAULT CURRENT_TIMESTAMP,
    content TEXT,
    PRIMARY KEY (id)
)  ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS tag (
    id INT AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE (name)
)  ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS article_tags (
    tag_id INT NOT NULL,
    article_id INT NOT NULL,
    FOREIGN KEY (tag_id) REFERENCES tag(id),
    FOREIGN KEY (article_id) REFERENCES article(id)
)  ENGINE=INNODB;