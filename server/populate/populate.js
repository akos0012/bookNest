import "dotenv/config";
import mongoose, { model } from "mongoose";
import path from "path";
import fs from "fs/promises";
import GenreModel from "../db/genre.model.js";
import AuthorModel from "../db/author.model.js";
import BookModel from "../db/book.model.js";
import ImageModel from "../db/image.model.js";
import UserModel from "../db/user.model.js";
import RatingModel from "../db/rating.model.js";
import data from "./data.json" assert {type: "json"};

const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
    console.error("Missing MONGO_URL environment variable");
    process.exit(1);
}

const populateUser = async () => {
    await UserModel.deleteMany({});

    for (const userData of data.users) {
        const user = new UserModel(userData);
        await user.save();
    }

    console.log("Users created");
};

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

const populateRating = async () => {
    await RatingModel.deleteMany({});

    await RatingModel.create(data.ratings);
    console.log("Ratings created");
}

const convertImageToBuffer = async (filePath) => {
    try {
        const data = await fs.readFile(filePath);
        //const base64Img = Buffer.from(data, 'binary').toString('base64');
        return data;
    } catch (error) {
        throw new Error(`Error reading file: ${error.message}`);
    }
}

const populateImage = async () => {
    await ImageModel.deleteMany({});

    const imagesData = await Promise.all(data.images.map(async (image) => {
        const buffer = await convertImageToBuffer(path.resolve(image.source));
        return {
            _id: image._id,
            data: buffer
        };
    }));

    await ImageModel.create(imagesData);
    console.log("Images created");
}

const main = async () => {
    await mongoose.connect(mongoUrl);

    await populateUser();
    await populateGenre();
    await populateAuthor();
    await populateBook();
    await populateImage();
    await populateRating();

    await mongoose.disconnect();
};

main().catch((error) => {
    console.error(error);
    process.exit(1);
});