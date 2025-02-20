import mongoose, { model } from "mongoose";
const { Schema } = mongoose;

const AuthorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    books: [{
        type: Schema.Types.ObjectId,
        ref: "Book"
    }]
});

export default model("Author", AuthorSchema);