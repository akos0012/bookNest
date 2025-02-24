import { Router } from "express";
import AuthorModel from "../db/author.model.js"
import BookModel from "../db/book.model.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";
const router = Router();

router.get('/authors', async (req, res) => {
    AuthorModel.find()
        .populate("books")
        .then((author) => res.json(author))
        .catch((error) => res.status(500).send(error));
});

router.get('/authors/:id', async (req, res) => {
    try {
        const author = await AuthorModel.findById(req.params.id)
            .populate("books");
        if (!author) return res.status(404).json({ message: "Author not found" });
        res.json(author);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/authors/find/:name', async (req, res) => {
    const { name } = req.params;
    const filter = { name: new RegExp(name, "i") };
    const authors = await AuthorModel.find(filter).sort({ name: "asc" })
        .populate("books")
    return res.json(authors);
});

router.post('/authors', authenticate, authorize(['admin']), async (req, res) => {
    try {
        const newAuthor = await AuthorModel.create(req.body);

        if (req.body.books && req.body.books.length > 0) {
            await BookModel.updateMany(
                { _id: { $in: req.body.books } },
                { $addToSet: { authors: newAuthor._id } }
            );
        }

        res.status(201).json(newAuthor);
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).send(error);
        }
        res.status(500).send(error);
    }
});

router.put('/authors/:id', authenticate, authorize(['admin']), async (req, res) => {
    try {

        const authorId = req.params.id;
        const { books } = req.body;

        const existingAuthor = await AuthorModel.findById(authorId);
        if (!existingAuthor) {
            return res.status(404).json({ message: "Author not found" });
        }

        const newAuthor = await AuthorModel.findByIdAndUpdate(
            authorId,
            req.body,
            { new: true, runValidators: true }
        );

        if (!newAuthor) return res.status(404).json({ message: "Author not found" });

        const previousBooks = existingAuthor.books.map(book => book.toString());
        const newBooks = books || [];
        const removedBooks = previousBooks.filter(bookId => !newBooks.includes(bookId));
        const addedBooks = newBooks.filter(bookId => !previousBooks.includes(bookId));

        // Remove the author from books that were removed
        await BookModel.updateMany(
            { _id: { $in: removedBooks } },
            { $pull: { authors: authorId } }
        );

        // Add the author to books that were added
        await BookModel.updateMany(
            { _id: { $in: addedBooks } },
            { $addToSet: { authors: authorId } }
        );

        res.status(200).json(newAuthor);
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).send(error);
        }
        res.status(500).send(error);
    }
});

router.delete('/authors/:id', authenticate, authorize(['admin']), async (req, res) => {
    try {
        const authorId = req.params.id;

        const author = await AuthorModel.findByIdAndDelete(authorId);
        if (!author) {
            return res.status(404).json({ message: "Author not found" });
        }

        await BookModel.updateMany(
            { authors: authorId },
            { $pull: { authors: authorId } }
        );

        res.json(author);
    } catch (error) {
        res.status(500).send(error);
    }
});

export default router;