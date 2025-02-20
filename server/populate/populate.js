import "dotenv/config";
import mongoose, { model } from "mongoose";
import GenreModel from "../db/genre.model.js";
import AuthorModel from "../db/author.model.js";
import BookModel from "../db/book.model.js";
import data from "./data.json" assert {type: "json"};

const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
    console.error("Missing MONGO_URL environment variable");
    process.exit(1);
}

const populateGenre = async () => {
    await GenreModel.deleteMany({});

    await GenreModel.create(data.genres);
    console.log("Genres created");
};

const populateAuthor = async () => {
    await AuthorModel.deleteMany({});

    await AuthorModel.create(data.authors);
    console.log("Authors created");
};

const populateBook = async () => {
    await BookModel.deleteMany({});

    await BookModel.create(data.books);
    console.log("Books created");
};

const main = async () => {
    await mongoose.connect(mongoUrl);

    await populateGenre();
    await populateAuthor();
    await populateBook();

    await mongoose.disconnect();
};

main().catch((error) => {
    console.error(error);
    process.exit(1);
});