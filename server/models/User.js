const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    chats: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "chat",
        require: true
    }],
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    }
})
module.exports = mongoose.model("user", UserSchema);