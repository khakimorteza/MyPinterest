DROP DATABASE IF EXISTS pinterest;
CREATE DATABASE pinterest;

\c pinterest;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR NOT NULL,
  email VARCHAR NOT NULL,
  password_digest VARCHAR NOT NULL
);

CREATE TABLE boards (
 id SERIAL PRIMARY KEY,
 title VARCHAR NOT NULL,
 user_id INT REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE pins (
 id SERIAL PRIMARY KEY,
 user_id INT REFERENCES users(id) ON DELETE CASCADE,
 board_id INT REFERENCES boards(id) ON DELETE CASCADE,
 url VARCHAR NOT NULL
);
/* remove user_id  from pins table*/
