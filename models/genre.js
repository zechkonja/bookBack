const mongoose = require('mongoose');

// Genre Schema
const genreSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  create_date: {
    type: Date,
    default: Date.now,
  },
});

// ---------> Genre object acessible from anywhere
const Genre = module.exports = mongoose.model('Genre', genreSchema);

// Get Genres
module.exports.getGenres = (callback, limit) => {
  Genre.find(callback).limit(limit);
};

// Add Genre  -> Here if you want to call callback
// element was inserted and get it back
// need to add like SECOND parameter in create function!!!!
module.exports.addGenre = (genre, callback) => {
  Genre.create(genre, callback);
};

// Update genre
module.exports.updateGenre = (id, genre, options, callback) => {
  const query = {
    _id: id,
  };
  const update = {
    name: genre.name,
  };
  Genre.findOneAndUpdate(query, update, options, callback);
};
