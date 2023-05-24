const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({

    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
    },
    emailVerified: {
        type: Boolean,
        default: false,
    },
    merchant: {
        type: Boolean,
        default: false,
    },
    role: {
        type: String,
        default: "member",
        enum: ["admin", "member", "merchant"],
    },
    randmomOtp: {
        type: String,
    },
    updated: {
        type: Date,
    },
    created: {
        type: Date,
        default: Date.now,
    },
    facebookId: {
        type: String,
    },
    linkedinId: {
        type: String,
    }

});


module.exports = mongoose.model('User', userSchema);