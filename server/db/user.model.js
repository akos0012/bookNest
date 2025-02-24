import mongoose, { model } from "mongoose";
import crypto from "crypto";

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
    salt: {
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

UserSchema.pre("save", function (next) {
    if (!this.isModified("password")) return next();

    this.salt = crypto.randomBytes(16).toString("hex");

    this.password = crypto.pbkdf2Sync(this.password, this.salt, 100000, 64, "sha512").toString("hex");

    next();
});

UserSchema.methods.comparePassword = function (candidatePassword) {
    const hash = crypto.pbkdf2Sync(candidatePassword, this.salt, 100000, 64, "sha512").toString("hex");
    return this.password === hash;
};

export default model("User", UserSchema);