import jwt from "jsonwebtoken";

export const authenticate = (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1];

    if (!token) {
        return res.status(403).json({ message: "Forbidden: No token provided." });
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "Forbidden: Token is invalid or has expired." });
        }

        req.user = decoded;
        next();
    });
};