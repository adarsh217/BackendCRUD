const express = require('express');
const Book = require('./models');

const router = express.Router();

router.get('/api/books', async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/api/books/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) throw new Error('Book not found');
        res.json(book);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

router.post('/api/books', async (req, res) => {
    console.log(req.data);
    const book = new Book({
        title: req.body.title,
        author: req.body.author,
        description: req.body.description
    });
    try {
        const newBook = await book.save();
        res.status(201).json(newBook);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.put('/api/books/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) throw new Error('Book not found');

        book.title = req.body.title;
        book.author = req.body.author;
        book.description = req.body.description;

        const updatedBook = await book.save();
        res.json(updatedBook);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

router.delete('/api/books/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) throw new Error('Book not found');

        await book.remove();
        res.json({ message: 'Book deleted successfully' });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

module.exports = router;