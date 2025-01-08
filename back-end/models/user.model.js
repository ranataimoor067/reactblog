import { Schema } from "mongoose";
import mongoose from "mongoose";

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: false
        },
        location: {
            type: String,
            required: false
        },
        picture: {
            type: String,
            required: false
        },
        dob: {
            type: Date,
            required: false
        },
        age: {
            type: Number,
            required: false,
            default: function () {
                if (this.dob) {
                    const ageDifMs = Date.now() - new Date(this.dob).getTime();
                    const ageDate = new Date(ageDifMs);
                    return Math.abs(ageDate.getUTCFullYear() - 1970);
                }
                return null;
            }
        },
        accountCreated: {
            type: Date,
            required: true,
            default: Date.now
        },
        articlesPublished: {
            type: Number,
            required: false,
            default: 0
        },
        isEmailVerified: {
            type: Boolean,
            default: false
        },
        likedArticles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Article' }],
    }
);

const User = mongoose.model("User", userSchema);

export { User };