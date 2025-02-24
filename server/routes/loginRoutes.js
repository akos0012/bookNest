import { Router } from "express";
import User from "../db/user.model.js"
import jwt from "jsonwebtoken"

const router = Router();

router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        const isMatch = user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        const token = jwt.sign({ id: user._id, username: user.username, roles: user.roles }, process.env.SECRET_KEY, { expiresIn: "20m" });

        res.json({ token });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

export default router;