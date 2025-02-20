import { Router } from "express";
import BookModel from "../db/book.model.js"
const router = Router();

router.get('/books', async (req, res) => {
    BookModel.find()
        //.populate("authors")
        .then((books) => res.json(books))
        .catch((error) => res.status(500).send(error));
});

router.get('/books/:id', async (req, res) => {
    try {
        const book = await BookModel.findById(req.params.id);
        if (!book) return res.status(404).json({ message: "Book not found" });
        res.json(book);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.post('/books', async (req, res) => {
    try {
        const newBook = await BookModel.create(req.body);
        res.status(201).json(newBook);
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).send(error);
        }
        res.status(500).send(error);
    }
});

router.put('/books/:id', async (req, res) => {
    try {
        const newBook = await BookModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!newBook) return res.status(404).json({ message: "Book not found" });

        res.status(200).json(newBook);
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).send(error);
        }
        res.status(500).send(error);
    }
});

router.delete('/books/:id', async (req, res) => {
    BookModel.findByIdAndDelete(req.params.id)
        .then(() => res.sendStatus(200))
        .catch((error) => res.status(500).send(error));
});

export default router;