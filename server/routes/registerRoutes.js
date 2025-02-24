import { Router } from "express";
import User from "../db/user.model.js";

const router = Router();

router.post("/register", async (req, res) => {
    const { username, password, isAdmin } = req.body;

    try {
        // Check if username already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "Username already exists" });
        }

        // Create a new user
        const newUser = new User({
            username,
            password,
            salt: " ",
            roles: isAdmin ? ["admin", "user"] : ["user"], // Assign roles based on checkbox
        });

        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

export default router;