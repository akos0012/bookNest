import { Router } from "express";
import ImageModel from "../db/image.model.js"
const router = Router();

router.get('/images/:id', async (req, res) => {
    try {
        const image = await ImageModel.findById(req.params.id);
        if (!image) return res.status(404).json({ message: "Image not found" });

        const buffer = image.data;
        const type = getImageType(buffer);
        if (!type) return res.status(400).send("Unsupported image type");

        res.setHeader("Content-Type", type);
        res.send(buffer);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/images/:id', async (req, res) => {
    ImageModel.findByIdAndDelete(req.params.id)
        .then(() => res.sendStatus(200))
        .catch((error) => res.status(500).send(error));
});

function getImageType(buffer) {
    if (buffer.length < 4) return null;

    if (buffer[0] === 0xFF && buffer[1] === 0xD8) {
        return "image/jpeg";
    }

    if (buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4E && buffer[3] === 0x47) {
        return "image/png";
    }

    return null;
}

export default router;