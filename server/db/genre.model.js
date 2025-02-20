import mongoose, { model } from "mongoose";
const { Schema } = mongoose;

const GenreSchema = new Schema({
    name: {
        type: String,
        required: true
    }
});

export default model("Genre", GenreSchema);