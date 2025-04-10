const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    history: [{
        role: {
            type: String,
            enum: ["user", "model"],
            required: true
        },
        parts: [
            {
                text: {
                    type: String,
                    required: true,
                },
                image : {
                    type : String,
                    default : null
                }
            }
        ],
    }],
    // timestamps : true
    
})

module.exports = new mongoose.model("chat", ChatSchema)
