const express = require("express");
const { sendMessage, getAllChats, getChatHistory } = require("../controller/Chat");
const { isLogedIn } = require("../middlewares/auth");
const upload = require("../utils/multerFile")

const chatRouter = express.Router();

chatRouter.post("/send-message",upload.single('image') , isLogedIn ,sendMessage);
chatRouter.post("/user-chats" , isLogedIn ,getAllChats);
chatRouter.post("/chat-history" , getChatHistory)

module.exports = chatRouter