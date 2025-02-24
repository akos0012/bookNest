import mongoose, { model } from "mongoose";
const { Schema } = mongoose;

const RatingSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    book: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Book"
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        required: false
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

export default model("Rating", RatingSchema);