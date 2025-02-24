import "dotenv/config";
import express, { json } from "express";
import { connect } from "mongoose";
import genreRoutes from "./routes/genreRoutes.js";
import authoRoutes from "./routes/authorRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import imageRoutes from "./routes/imageRoutes.js";
import loginRoutes from "./routes/loginRoutes.js";
import ratingRoutes from "./routes/ratingRoutes.js";
import favoriteRoutes from "./routes/favoriteRoutes.js";
import registerRoutes from "./routes/registerRoutes.js";

const { MONGO_URL, PORT, SECRET_KEY } = process.env;
import cors from "cors";

if (!MONGO_URL || !SECRET_KEY) {
    console.error("Missing required environment variables: MONGO_URL or SECRET_KEY");
    process.exit(1);
}

const app = express();
app.use(json({ limit: "25mb" }));

const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

app.use('/api', loginRoutes);
app.use('/api', genreRoutes);
app.use('/api', authoRoutes);
app.use('/api', bookRoutes);
app.use('/api', imageRoutes);
app.use('/api', ratingRoutes);
app.use('/api', favoriteRoutes);
app.use('/api', registerRoutes);

const main = async () => {
    await connect(MONGO_URL);

    app.listen(PORT, () => {
        console.log("App is listening on " + PORT);
    });
};

main().catch((err) => {
    console.error(err);
    process.exit(1);
});