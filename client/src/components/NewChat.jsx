import React, { useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import { AiOutlineSend } from "react-icons/ai";
import { ImSpinner2 } from "react-icons/im";
import { FaImage } from "react-icons/fa6";
import Markdown from "react-markdown";
import Upload from "./Upload"; // Assuming this component exists
import { sendMessage } from "../services/apis/Chat";

const NewChatPage = () => {
  const [loading, setLoading] = useState(false);
  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState("");
  const [drop, setDrop] = useState(false);
  const navigate = useNavigate();

  const formData = new FormData();
  formData.append("text" , "")
  formData.append("image" , "")
  formData.append("chatId" , "")
  
  const handleSendMessage = async () => {
    if (message.trim()) {
      const newMessage = message.trim();
      setMessage("");
      setLoading(true);
      formData.set("text" , newMessage)
      const response = await sendMessage(formData);
      console.log("yha ha ",response)
       if(response?.success){
        navigate(`/pixelchat/${response.chatId}`)
        setLoading(false);
       } 
    }
  };

  const toggleDrop = () => {
    setDrop(!drop);
  };

  const handleUploadImage = (file) => {
    console.log(file);
    // Add logic here to handle image upload if needed
  };

  return (
    <div className="flex flex-col h-full w-full bg-gradient-to-br from-gray-900 to-indigo-950 text-white font-sans">
      {/* Chat Area */}
      <div
        className={`flex flex-col flex-1 overflow-y-auto p-4 md:p-6 space-y-6 custom-scrollbar ${
          drop ? "opacity-40" : "opacity-100"
        } transition-opacity duration-300`}
      >
        {chat.length === 0 ? (
          <div className="flex-1 flex items-center justify-center text-gray-400 text-center">
            <p className="text-sm md:text-base">Start a new conversation!</p>
          </div>
        ) : (
          chat.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`inline-block px-4 py-2 rounded-3xl shadow-lg transition-all duration-200 hover:shadow-xl ${
                  msg.role === "user"
                    ? "bg-gradient-to-r from-indigo-500 to-blue-500 text-white"
                    : "bg-gray-800/80 text-gray-100"
                }`}
              >
                {msg.parts[0]?.image && (
                  <img
                    src={msg.parts[0]?.image}
                    alt="chat media"
                    className="w-48 h-32 rounded-lg mb-2 object-cover"
                  />
                )}
                <Markdown className="prose prose-invert max-w-none text-sm md:text-base">
                  {msg?.parts[0]?.text}
                </Markdown>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Upload Overlay */}
      <div
        className={`${
          drop ? "fixed" : "hidden"
        } inset-0 z-20 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-all duration-300`}
      >
        <div className="bg-gray-900 rounded-2xl shadow-2xl p-6 w-full max-w-md mx-4 animate-fade-in">
          <Upload toggleDrop={toggleDrop} onUpload={handleUploadImage} />
        </div>
      </div>

      {/* Input Area */}
      <div className="relative p-4 md:p-6 bg-transparent">
        {loading && (
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 flex items-center bg-gray-800/80 px-3 py-1 rounded-full text-gray-300 text-sm">
            <ImSpinner2 className="animate-spin mr-2" />
            <span>Thinking...</span>
          </div>
        )}
        <div className="flex items-center gap-3 max-w-4xl mx-auto bg-gray-800/50 backdrop-blur-md p-2 rounded-full shadow-lg">
          <button
            onClick={toggleDrop}
            className="p-2 rounded-full hover:bg-gray-700 text-gray-300 hover:text-white transition-colors duration-200"
          >
            <FaImage size={20} />
          </button>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 bg-transparent text-white placeholder-gray-400 focus:outline-none text-sm md:text-base"
          />
          <button
            onClick={handleSendMessage}
            disabled={loading}
            className="p-3 rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <AiOutlineSend size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewChatPage;
