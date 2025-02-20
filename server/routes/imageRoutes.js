import { Router } from "express";
import ImageModel from "../db/image.model.js"
const router = Router();

router.get('/images/:id', async (req, res) => {
    ImageModel.findById(req.params.id)
        .then((img) => res.json(img))
        .catch((error) => res.status(500).send(error));
});

router.get('/images/:id', async (req, res) => {
    ImageModel.findByIdAndDelete(req.params.id)
        .then(() => res.sendStatus(200))
        .catch((error) => res.status(500).send(error));
});

export default router;