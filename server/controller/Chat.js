const Chat = require("../models/Chat")
const User = require("../models/User")
const {dotenv} = require("dotenv").config()
const { GoogleGenerativeAI } = require("@google/generative-ai");
const imageUploader = require("../utils/imageUploader");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY );
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


exports.sendMessage = async (req, res) => {
    const { text, chatId } = req.body;
    const title = text.slice(0, 4) + "..."
    const image = req.file;
    const { id } = req.user;
    try {
        let chat;
        let image_url =  ""; 
        let imagePart = null; 
        console.log(image);
        
        if(image){

            //upload image to cloudinary
            const upload = await imageUploader(image);
            image_url = upload.secure_url;

            //convert image buffer to base64
            const base64Image = image.buffer.toString("base64"); // Convert file buffer to base64
            imagePart = {
                inlineData: {
                    data: base64Image,
                    mimeType: image.mimetype, // MIME type of the uploaded file
                },
            };
        }
        
        if (!chatId) {
            // Case 1: New Chat
            chat = new Chat({
                userId: id,
                history: [{ role: "user", parts: image ? [{ text, image : image_url }] : [{ text }] }],
                title
            });

            const updatedUser = await User.findByIdAndUpdate({ _id: id }, {
                $push: { chats: chat._id }
            })

        } else {
            // Case 2: Existing Chat
            chat = await Chat.findById(chatId);
            if (!chat) {
                return res.status(404).json({ message: "Chat not found" });
            }
            chat.history.push({ role: "user", parts: image ? [{ text, image : image_url }] : [{ text }] });
        }
   
        const geminiChat = model.startChat({
            history: chat.history.map((elem) => ({
                role: elem.role,
                parts: elem.parts.map((part) => ({ text: part.text })),
            }))
        });

        // Send the user's message to the chat session
        const result = await geminiChat.sendMessage(image ? [text, imagePart] : [text]);

        // Extract the AI's response
        const aiResponseText = result.response.text();

        // Add the AI's response to the chat history
        chat.history.push({ role: "model", parts: [{ text: aiResponseText }] });

        await chat.save();

        // Return the AI's response
        return res.status(200).json({
            success : true ,
            message: aiResponseText,
            chatId: chat._id,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success : false , message: "Error processing message" });
    }

}

exports.getAllChats = async (req, res) => {
    try {
        const { id } = req.user;

        const userChats = await User.findById({ _id: id }).populate('chats');
        if (!userChats) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ success: true, message: "userChats fetch successfully", userChats });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ success : false , message: "Error fetching user chats", error });
    }
}

exports.getChatHistory = async (req, res) => {
    try {
        const { chatId } = req.body;
        if (!chatId) {
            return res.status(400).json({ success: false, message: "Chat Id is missing" });
        }

        const chat = await Chat.findById({ _id: chatId });

        if (!chat) {
            return res.status(400).json({ success: false, message: "Chat not found" });
        }

        return res.status(200).json({ success: true, message: "Chat history fetch successfully", chatHistory: chat.history })


    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error fetching chat history", error });
    }
}