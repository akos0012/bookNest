import { Router } from "express";
import FavoriteModel from "../db/favorite.model.js"
import { authenticate } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

const router = Router();

router.get('/favorites/user/:username', authenticate, authorize(['user', 'admin']), async (req, res) => {
    const username = req.params.username;

    try {
        const favorites = await FavoriteModel.find({ username }).populate("book");

        res.json(favorites);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.post('/favorites', authenticate, authorize(['user', 'admin']), async (req, res) => {
    FavoriteModel.create(req.body)
        .then((favorite) => res.json(favorite))
        .catch((error) => res.status(500).send(error));
});

router.delete('/favorites/:id', authenticate, authorize(['user', 'admin']), async (req, res) => {
    FavoriteModel.findByIdAndDelete(req.params.id)
        .then((favorite) => res.json(favorite))
        .catch((error) => res.status(500).send(error));
});

export default router;