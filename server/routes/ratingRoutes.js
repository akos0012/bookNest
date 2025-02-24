import { Router } from "express";
import RatingModel from "../db/rating.model.js"
import { authenticate } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";
const router = Router();

router.get('/ratings/book/:id', async (req, res) => {
    const bookId = req.params.id;

    try {
        const ratings = await RatingModel.find({ book: bookId });
        res.json(ratings);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.post('/ratings', authenticate, authorize(['user', 'admin']), async (req, res) => {
    RatingModel.create(req.body)
        .then((rating) => res.json(rating))
        .catch((error) => res.status(500).send(error));
});

export default router;