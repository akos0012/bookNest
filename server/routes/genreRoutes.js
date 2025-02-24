import { Router } from "express";
import GenreModel from "../db/genre.model.js";
import BookModel from "../db/book.model.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";
const router = Router();

router.get('/genres', async (req, res) => {
    GenreModel.find()
        .then((genres) => res.json(genres))
        .catch((error) => res.status(500).send(error));
});

router.get('/genres/:id', async (req, res) => {
    try {
        const genre = await GenreModel.findById(req.params.id);
        if (!genre) return res.status(404).json({ message: "Genre not found" });
        res.json(genre);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/genres/find/:name', async (req, res) => {
    const { name } = req.params;
    const filter = { name: new RegExp(name, "i") };
    const genres = await GenreModel.find(filter).sort({ name: "asc" })
    return res.json(genres);
});

router.post('/genres', authenticate, authorize(['admin']), async (req, res) => {
    try {
        const newGenre = await GenreModel.create(req.body);
        res.status(201).json(newGenre);
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).send(error);
        }
        res.status(500).send(error);
    }
});

router.put('/genres/:id', authenticate, authorize(['admin']), async (req, res) => {
    try {
        const newGenre = await GenreModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!newGenre) return res.status(404).json({ message: "Genre not found" });

        res.status(200).json(newGenre);
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).send(error);
        }
        res.status(500).send(error);
    }
});

router.delete('/genres/:id', authenticate, authorize(['admin']), async (req, res) => {
    try {
        const genreId = req.params.id;

        const genre = await GenreModel.findByIdAndDelete(genreId);
        if (!genre) {
            return res.status(404).json({ message: "Genre not found" });
        }

        await BookModel.updateMany(
            { genres: genreId },
            { $pull: { genres: genreId } }
        );

        res.json(genre);
    } catch (error) {
        res.status(500).send(error);
    }
});

export default router;



