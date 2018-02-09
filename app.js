const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const app = express();

const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(bodyParser.json());

app.use(cors());

// Get Genre object from model!!!!
Genre = require('./models/genre');

// Get Book object from model!!!!
Book = require('./models/book');

// Connect to mongoose
mongoose.connect('mongodb://localhost/bookstore');
const db = mongoose.connection;

// Home url
app.get('/', (req, res) => {
  res.send('Please use /api/books or /api/genres');
});

// Get genres
app.get('/api/genres', (req, res) => {
  Genre.getGenres((err, genres) => {
    if (err) {
      throw err;
    }

    res.json(genres);
  });
});

// Create new genre
app.post('/api/genres', (req, res) => {
  const genre = req.body; // -> body-parser -> access everything comes from form

  Genre.addGenre(genre, (err, genre1) => {
    if (err) {
      throw err;
    }

    res.json(genre1);
  });
});

// Update genre
app.put('/api/genres/:_id', (req, res) => {
  const id = req.params._id;
  const genre = req.body; // -> body-parser -> access everything comes from form

  Genre.updateGenre(id, genre, {}, (err, genre1) => {
    if (err) {
      throw err;
    }

    res.json(genre1);
  });
});

// Get books
app.get('/api/books', (req, res) => {
  Book.getBooks((err, books) => {
    if (err) {
      throw err;
    }

    res.json(books);
  });
});

// Get book by id
app.get('/api/books/:_id', (req, res) => {
  const id = req.params._id; // => get id from url
  Book.getBookById(id, (err, book) => {
    if (err) {
      throw err;
    }

    res.json(book);
  });
});

// Insert new book
app.post('/api/books', (req, res) => {
  const book = req.body; // -> body-parser -> access everything comes from form

  Book.addBook(book, (err, book1) => {
    if (err) {
      throw err;
    }

    res.json(book1);
  });
});

// Update book
app.put('/api/books/:_id', (req, res) => {
  const id = req.params._id;
  const book = req.body; // -> body-parser -> access everything comes from form

  Book.updateBook(id, book, {}, (err, book1) => {
    if (err) {
      throw err;
    }

    res.json(book1);
  });
});

app.listen(3000);
console.log('Running on port 3000...');
