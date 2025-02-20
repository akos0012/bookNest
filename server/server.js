import "dotenv/config";
import express, { json } from "express";
import { connect } from "mongoose";
import genreRoutes from "./routes/genreRoutes.js";
import authoRoutes from "./routes/authorRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import imageRoutes from "./routes/imageRoutes.js";
const { MONGO_URL, PORT } = process.env;
import cors from "cors";

if (!MONGO_URL) {
    console.error("Missing MONGO_URL environment variable");
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

app.use('/api', genreRoutes);
app.use('/api', authoRoutes);
app.use('/api', bookRoutes);
app.use('/api', imageRoutes);

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