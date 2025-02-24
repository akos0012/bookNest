export const authorize = (roles = []) => {
    return (req, res, next) => {

        if (roles.length === 0) {
            return next();
        }


        const user = req.user;
        if (!user || !user.roles || !roles.some(role => user.roles.includes(role))) {
            return res.status(403).json({ message: "Forbidden: You do not have permission to access this resource." });
        }

        next();
    };
};