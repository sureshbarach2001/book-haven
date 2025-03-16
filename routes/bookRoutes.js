const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// GET all books
router.get('/books', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single book by ISBN
router.get('/books/:isbn', async (req, res) => {
  try {
    const book = await Book.findOne({ isbn: req.params.isbn });
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST new book
router.post('/books', async (req, res) => {
  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    isbn: req.body.isbn,
    publicationDate: req.body.publicationDate,
    genre: req.body.genre
  });

  try {
    const newBook = await book.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// POST new review to a book
router.post('/books/:isbn/reviews', async (req, res) => {
  try {
    const book = await Book.findOne({ isbn: req.params.isbn });
    if (!book) return res.status(404).json({ message: 'Book not found' });

    book.reviews.push({
      reviewer: req.body.reviewer,
      rating: req.body.rating,
      comment: req.body.comment
    });

    const updatedBook = await book.save();
    res.status(201).json(updatedBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT update book details
router.put('/books/:isbn', async (req, res) => {
  try {
    const book = await Book.findOne({ isbn: req.params.isbn });
    if (!book) return res.status(404).json({ message: 'Book not found' });

    const updates = {
      title: req.body.title,
      author: req.body.author,
      publicationDate: req.body.publicationDate,
      genre: req.body.genre
    };

    const updatedBook = await Book.findOneAndUpdate(
      { isbn: req.params.isbn },
      { $set: updates },
      { new: true }
    );
    res.json(updatedBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE book
router.delete('/books/:isbn', async (req, res) => {
  try {
    const book = await Book.findOneAndDelete({ isbn: req.params.isbn });
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;