DROP DATABASE IF EXISTS fav_movies;
CREATE DATABASE fav_movies;
USE fav_movies;

CREATE TABLE movies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    movie_name VARCHAR(100)
);

CREATE TABLE reviews (
    id INT,
    movie_id INT,
    review TEXT,
    FOREIGN KEY(movie_id) REFERENCES movies(id)
)
