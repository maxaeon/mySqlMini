const express = require('express');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

//middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'MaxAeon',
    password: 'Philosopher91',
    database: 'movies_db'
  },
  console.log(`Successfully connected to the movies_db database!`)
);

//new movie
app.post('/api/new-movie', ({ body }, res) => {
  const sql = `INSERT INTO movies (movie_name)
    VALUES (?)`;
  const params = [body.movie_name];
  
  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'Movie successfully created!',
      data: body
    });  }); });

//read all movies
app.get('/api/movies', (req, res) => {
  const sql = `SELECT id, movie_name AS title FROM movies`;
  
  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
       return;
    }
    res.json({
      message: 'Movies successfully read!',
      data: rows
    });  }); });

//delete a movie
app.delete('/api/movie/:id', (req, res) => {
  const sql = `DELETE FROM movies WHERE id = ?`;
  const params = [req.params.id];
  
  db.query(sql, params, (err, result) => {
    if (err) {
      res.statusMessage(400).json({ error: res.message });
    } else if (!result.affectedRows) {
      res.json({
      message: 'Oh, no! This action could not be completed. Movie not found :('
      });
    } else {
      res.json({
        message: 'Movie successfully deleted!',
        changes: result.affectedRows,
        id: req.params.id
      });
    } }); });


    //JOIN
app.get('/api/movie-reviews', (req, res) => {
  const sql = `SELECT movies.movie_name AS movie, reviews.review FROM reviews LEFT JOIN movies ON reviews.movie_id = movies.id ORDER BY movies.movie_name;`;
  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: 'Movies successfully joined with their reviews!',
      data: rows
    }); }); });



//update review
app.put('/api/review/:id', (req, res) => {
  const sql = `UPDATE reviews SET review = ? WHERE id = ?`;
  const params = [req.body.review, req.params.id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
    } else if (!result.affectedRows) {
      res.json({
        message: 'Oh, no! This action could not be completed. Movie not found :('
      });
    } else {
      res.json({
        message: 'Movie review updated successfully!',
        data: req.body,
        changes: result.affectedRows
      });
    } }); });

app.use((req, res) => {
  res.status(404).end();
});
