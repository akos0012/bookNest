import mongoose, { model } from "mongoose";
const { Schema } = mongoose;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    roles: {
        type: [String],
        default: ["user"]
    },
    created_at: {
        type: Date,
        default: Date.now
    },
});

export default model("User", UserSchema);