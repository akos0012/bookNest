import { Router } from "express";
import AuthorModel from "../db/author.model.js"
const router = Router();

router.get('/authors', async (req, res) => {
    AuthorModel.find()
        .then((author) => res.json(author))
        .catch((error) => res.status(500).send(error));
});

router.get('/authors/:id', async (req, res) => {
    try {
        const author = await AuthorModel.findById(req.params.id);
        if (!author) return res.status(404).json({ message: "Author not found" });
        res.json(author);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.post('/authors', async (req, res) => {
    try {
        const newAuthor = await AuthorModel.create(req.body);
        res.status(201).json(newAuthor);
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).send(error);
        }
        res.status(500).send(error);
    }
});

router.put('/authors/:id', async (req, res) => {
    try {
        const newAuthor = await AuthorModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!newAuthor) return res.status(404).json({ message: "Author not found" });

        res.status(200).json(newAuthor);
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).send(error);
        }
        res.status(500).send(error);
    }
});

router.delete('/authors/:id', async (req, res) => {
    AuthorModel.findByIdAndDelete(req.params.id)
        .then(() => res.sendStatus(200))
        .catch((error) => res.status(500).send(error));
});

export default router;