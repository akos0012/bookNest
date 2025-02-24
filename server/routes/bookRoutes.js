import { Router } from "express";
import BookModel from "../db/book.model.js"
import ImageModel from "../db/image.model.js";
import AuthorModel from "../db/author.model.js";
import { Buffer } from "buffer";
import { authenticate } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";
const router = Router();

router.get('/books', async (req, res) => {
    try {
        const books = await BookModel.find()
            .populate("authors")
            .populate("genres");

        res.json(books);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/books/filter', async (req, res) => {
    const { query, sort, order, page = 1, limit = 6 } = req.query;

    const filter = {};
    if (query) {
        filter.title = { $regex: query, $options: 'i' };
    }

    const sortOptions = {};
    if (sort) {
        sortOptions[sort] = order === 'asc' ? 1 : -1;
    }

    try {

        const pageNum = parseInt(page);
        const limitNum = parseInt(limit);

        const total = await BookModel.countDocuments(filter);

        const books = await BookModel.find(filter)
            .populate("authors")
            .populate("genres")
            .sort(sortOptions)
            .skip((pageNum - 1) * limitNum)
            .limit(limitNum)
            .exec();

        res.json({ books, total });
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/books/:id', async (req, res) => {
    try {
        const book = await BookModel.findById(req.params.id)
            .populate("authors")
            .populate("genres");
        if (!book) return res.status(404).json({ message: "Book not found" });
        res.json(book);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/books/find/:title', async (req, res) => {
    const { title } = req.params;
    const filter = { title: new RegExp(title, "i") };
    const books = await BookModel.find(filter).sort({ title: "asc" })
        .populate("authors")
        .populate("genres");
    return res.json(books);
});

router.post('/books', authenticate, authorize(['admin']), async (req, res) => {
    try {
        let newBook = null;

        if (req.body.image) {
            const imageBuffer = Buffer.from(req.body.image, 'base64');
            const image = await ImageModel.create({ data: imageBuffer });
            newBook = await BookModel.create({ ...req.body, image: image._id });
        } else {
            newBook = await BookModel.create(req.body);
        }

        if (req.body.authors && req.body.authors.length > 0) {
            await AuthorModel.updateMany(
                { _id: { $in: req.body.authors } },
                { $addToSet: { books: newBook._id } }
            );
        }

        res.status(201).json(newBook);
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).send(error);
        }
        res.status(500).send(error);
    }
});

router.put('/books/:id', authenticate, authorize(['admin']), async (req, res) => {
    try {

        const bookId = req.params.id;
        const { authors } = req.body;

        const existingBook = await BookModel.findById(bookId);
        if (!existingBook) {
            return res.status(404).json({ message: "Book not found" });
        }

        let updatedFields = { ...req.body };

        if (req.body.image) {
            if (book.image) {
                await ImageModel.findByIdAndDelete(book.image);
            }

            const imageBuffer = Buffer.from(req.body.image, 'base64');
            const newImage = await ImageModel.create({ data: imageBuffer });

            updatedFields.image = newImage._id;
        }

        const newBook = await BookModel.findByIdAndUpdate(
            bookId,
            updatedFields,
            { new: true, runValidators: true }
        );

        if (!newBook) return res.status(404).json({ message: "Book not found" });

        const previousAuthors = existingBook.authors.map(author => author.toString());
        const newAuthors = authors || [];
        const removedAuthors = previousAuthors.filter(authorId => !newAuthors.includes(authorId));
        const addedAuthors = newAuthors.filter(authorId => !previousAuthors.includes(authorId));

        await AuthorModel.updateMany(
            { _id: { $in: removedAuthors } },
            { $pull: { books: bookId } }
        );

        await BookModel.updateMany(
            { _id: { $in: addedAuthors } },
            { $addToSet: { books: bookId } }
        );

        res.status(200).json(newBook);
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).send(error);
        }
        res.status(500).send(error);
    }
});

router.delete('/books/:id', authenticate, authorize(['admin']), async (req, res) => {
    try {
        const bookId = req.params.id;

        const book = await BookModel.findByIdAndDelete(bookId);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        if (book.image)
            await ImageModel.findByIdAndDelete(book.image);

        await AuthorModel.updateMany(
            { books: bookId },
            { $pull: { books: bookId } }
        );

        res.json(book);
    } catch (error) {
        res.status(500).send(error);
    }
});

export default router;