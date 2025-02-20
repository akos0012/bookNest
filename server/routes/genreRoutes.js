import { Router } from "express";
import GenreModel from "../db/genre.model.js";
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

router.post('/genres', async (req, res) => {
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

router.delete('/genres/:id', async (req, res) => {
    GenreModel.findByIdAndDelete(req.params.id)
        .then(() => res.sendStatus(200))
        .catch((error) => res.status(500).send(error));
});

export default router;



