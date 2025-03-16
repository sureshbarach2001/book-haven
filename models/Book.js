const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  reviewer: String,
  rating: {
    type: Number,
    min: 1,
    max: 5
  },
  comment: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  isbn: {
    type: String,
    unique: true,
    required: true
  },
  publicationDate: Date,
  genre: String,
  reviews: [reviewSchema]
});

module.exports = mongoose.model('Book', bookSchema);