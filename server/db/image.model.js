import mongoose, { model } from "mongoose";
const { Schema } = mongoose;

const ImageSchema = new Schema({
    img: String
});

export default model("Image", ImageSchema);