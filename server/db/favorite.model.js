import mongoose, { model } from "mongoose";
const { Schema } = mongoose;

const FavoriteSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
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