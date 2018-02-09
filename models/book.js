const mongoose = require('mongoose');

// Book Schema
const bookSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  author: {
    type: String,
  },
  publisher: {
    type: String,
  },
  pages: {
    type: Number,
  },
  image_url: {
    type: String,
  },
  buy_url: {
    type: String,
  },
  create_date: {
    type: Date,
    default: Date.now,
  },
});

// ---------> Book object acessible from anywhere
const Book = module.exports = mongoose.model('Book', bookSchema);

// Get Books
module.exports.getBooks = (callback, limit) => {
  Book.find(callback).limit(limit);
};

// Get Book by id
module.exports.getBookById = (id, callback) => {
  Book.findById(id, callback);
};

// Add new book // -> Here if you want to call callback
// element was inserted and get it back
// need to add like SECOND parameter in create function!!!!
module.exports.addBook = (book, callback) => {
  Book.create(book, callback);
};

// Update book
module.exports.updateBook = (id, book, options, callback) => {
  const query = {
    _id: id,
  };
  const update = {
    title: book.title,
    genre: book.genre,
    description: book.description,
    author: book.author,
    publisher: book.publisher,
    pages: book.pages,
    image_url: book.image_url,
    buy_url: book.buy_url,
  };
  Book.findOneAndUpdate(query, update, options, callback);
};
