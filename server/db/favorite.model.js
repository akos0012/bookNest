import mongoose, { model } from "mongoose";
const { Schema } = mongoose;

const FavoriteSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    book: {
        type: Schema.Types.ObjectId,
        ref: "Book",
        required: true
    },
    added_at: {
        type: Date,
        default: Date.now
    }
});

export default model("Favorite", FavoriteSchema);