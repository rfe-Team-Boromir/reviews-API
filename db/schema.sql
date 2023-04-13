CREATE SCHEMA IF NOT EXISTS reviews;

CREATE TABLE products(
  product_id INT NOT NULL PRIMARY KEY
);


CREATE TABLE reviews (
  id SERIAL NOT NULL PRIMARY KEY,
  product_id INT NULL DEFAULT NULL,
  rating INT NULL DEFAULT NULL,
  epoch_time BIGINT NULL DEFAULT NULL,
  summary VARCHAR NULL DEFAULT NULL,
  body VARCHAR NULL DEFAULT NULL,
  recommend VARCHAR NULL DEFAULT NULL,
  reported VARCHAR NULL DEFAULT NULL,
  reviewer_name VARCHAR NULL DEFAULT NULL,
  reviewer_email VARCHAR NULL DEFAULT NULL,
  response VARCHAR NULL DEFAULT NULL,
  helpfulness INT NULL DEFAULT NULL

);


CREATE TABLE meta(
  id SERIAL NOT NULL,
  product_id INT NULL DEFAULT NULL
);


CREATE TABLE photos(
  id SERIAL,
  review_id INT,
  url VARCHAR
);


CREATE TABLE ratings(
  "1" INT,
  "2" INT,
  "3" INT,
  "4" INT,
  "5" INT
);


CREATE TABLE recommend(
  id SERIAL,
  "true" INT,
  "false" INT
);


CREATE TABLE size(
  id SERIAL NOT NULL,
  val INT
);


CREATE TABLE width(
  id SERIAL NOT NULL,
  val INT
);


CREATE TABLE comfort(
  id SERIAL NOT NULL,
  val INT
);

CREATE TABLE characteristics (
  id SERIAL NOT NULL,
  product_id INT NOT NULL,
  name VARCHAR NOT NULL
);

CREATE TABLE characteristics_reviews (
  id SERIAL NOT NULL,
  characteristics_id INT NOT NULL,
  review_id INT NOT NULL,
  value INT NOT NULL
);



