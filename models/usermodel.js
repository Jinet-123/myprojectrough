const mongoose = require("mongoose")

const userschema = new mongoose.Schema({
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
    profile: {
        type: String,
        default: ""
    },
    bio: {
        type: String,
        default: "new user"
    },
    role: {
        type: String,
        default: "user"
    },
    isseller: {
        type: String,
        enum: ["user", "pending", "approved","rejected"],
        default: "user"
    },
    idproof: {
        type: Array,
        default: []
    },
    sellerinfo: {
        name: String,
        email: String,
        phone: String
    }
})

const users = mongoose.model("users", userschema)
module.exports = users