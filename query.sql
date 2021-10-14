-- created movies.movie_name
-- created reviews.review

SELECT movies.movie_name AS movie, reviews.review
FROM reviews
RIGHT JOIN movies
ON reviews.movie_id = movies.id
ORDER BY movies.movie_name;
