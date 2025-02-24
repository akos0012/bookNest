import mongoose, { model } from "mongoose";
const { Schema } = mongoose;

const ImageSchema = new Schema({
    data: {
        type: Buffer,
        required: true
    }
});

export default model("Image", ImageSchema);