
CREATE DATABASE knowhow;
CREATE USER 'admin'@'%' identified by 'p@ssw0rd!';
GRANT ALL  on knowhow.* to 'admin'@'%';

--- If mysql is > 8.0
--- mysql> ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'root';
--- mysql> ALTER USER 'admin'@'%' IDENTIFIED WITH mysql_native_password BY 'admin'; 

USE knowhow;

DROP TABLE IF EXISTS categories;
CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    status TINYINT DEFAULT 1,
    description TEXT,
    PRIMARY KEY (id)
)  ENGINE=INNODB;

DROP TABLE IF EXISTS articles;
CREATE TABLE IF NOT EXISTS articles (
    id INT AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    status TINYINT DEFAULT 1,
    create_date TIMESTAMP  DEFAULT CURRENT_TIMESTAMP,
    category_id INT REFERENCES categories(id) ON DELETE CASCADE,
    content TEXT,
    PRIMARY KEY (id)
)  ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS tags (
    id INT AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE (name)
)  ENGINE=INNODB;

DROP TABLE IF EXISTS article_tags;
CREATE TABLE IF NOT EXISTS articles_tags (
    tag_id INT NOT NULL,
    article_id INT NOT NULL,
    FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE,
    FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE
)  ENGINE=INNODB;

INSERT INTO categories (name, status, description) VALUES ("Operations", 1, "Operations related articles");
INSERT INTO categories (name, status, description) VALUES ("Development", 1, "Development related articles");
INSERT INTO categories (name, status, description) VALUES ("Administration", 1, "Administration related articles");
INSERT INTO categories (name, status, description) VALUES ("Office", 1, "Office related articles");
INSERT INTO categories (name, status, description) VALUES ("Databases", 1, "Databases related articles");

SELECT * from categories;

INSERT INTO articles (id, title, status, category_id, content) VALUES (1, "Operations Note", 1, 1, "Test content1, blah blah\nNothing very interesting.");
INSERT INTO articles (title, status, category_id, content) VALUES ( "Operations Note2", 1, 1, "Test content2, blah blah\nNothing very interesting.");
INSERT INTO articles (title, status, category_id, content) VALUES ( "Operations Note3", 1, 1, "Test content3, blah blah\nNothing very interesting.");
INSERT INTO articles (title, status, category_id, content) VALUES ( "Operations Note4", 1, 1, "Test content4, blah blah\nNothing very interesting.");
INSERT INTO articles (title, status, category_id, content) VALUES ( "Operations Note5", 1, 1, "Test content5, blah blah\nNothing very interesting.");
INSERT INTO articles (title, status, category_id, content) VALUES ( "Operations Note6", 1, 1, "Test content6, blah blah\nNothing very interesting.");

INSERT INTO articles (title, status, category_id, content) VALUES ( "Development Note1", 1, 2, "Test content1, blah blah\nNothing very interesting.");
INSERT INTO articles (title, status, category_id, content) VALUES ( "Development Note2", 1, 2, "Test content2, blah blah\nNothing very interesting.");

INSERT INTO articles (title, status, category_id, content) VALUES ( "Administration Note1", 1, 3, "Test content3, blah blah\nNothing very interesting.");
INSERT INTO articles (title, status, category_id, content) VALUES ( "Administration Note2", 1, 3, "Test content4, blah blah\nNothing very interesting.");

INSERT INTO articles (title, status, category_id, content) VALUES ( "Office Note1", 1, 4, "Test content5, blah blah\nNothing very interesting.");
INSERT INTO articles (title, status, category_id, content) VALUES ( "Office Note3", 1, 4, "Test content6, blah blah\nNothing very interesting.");

SELECT * from articles;