import mongoose, { model } from "mongoose";
const { Schema } = mongoose;

const BookSchema = new Schema({
    title: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 100
    },
    authors: [{
        type: Schema.Types.ObjectId,
        ref: "Author"
    }],
    genres: [{
        type: Schema.Types.ObjectId,
        ref: "Genre"
    }],
    publisher_date: {
        type: Date,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    averageRating: {
        type: Number,
        default: 0.0,
        min: 0,
        max: 5
    },
    image: {
        type: Schema.Types.ObjectId,
        ref: "Image"
    }
});

export default model("Book", BookSchema);