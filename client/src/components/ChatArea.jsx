import React, { useEffect, useState } from "react";
import Markdown from "react-markdown";
import { useParams } from "react-router-dom";
import { AiOutlineSend } from "react-icons/ai";
import { ImSpinner2 } from "react-icons/im";
import { FaImage } from "react-icons/fa6";
import Upload from "./Upload";
import { getChatHistory, sendMessage } from "../services/apis/Chat";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism"; // A popular dark theme

const ChatArea = () => {
  const { chatId } = useParams();
  const [loading, setLoading] = useState(false);
  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState("");
  const [drop, setDrop] = useState(false);
  const [image, setImage] = useState(null);
  const formData = new FormData();

  formData.append("chatId", chatId);

  const fetchChatHistory = async () => {
    const response = await getChatHistory(chatId);
    if (response.success) {
      setChat(response.chatHistory);
    }
  };

  const handleSendMessage = async () => {
    if (message.trim()) {
      const newMessage = message.trim();
      formData.append("text", newMessage);
      if (image) {
        formData.append("image", image);
      }

      setMessage("");
      setLoading(true);

      setChat((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          role: "user",
          parts: [
            {
              text: newMessage,
              image: image ? URL.createObjectURL(image) : null,
            },
          ],
        },
      ]);

      const response = await sendMessage(formData);

      if (response.success) {
        setChat((prev) => [
          ...prev,
          {
            id: prev.length + 1,
            role: "model",
            parts: [{ text: response.message }],
          },
        ]);
      } else {
        console.log(response.data);
        setChat((prev) => [
          ...prev,
          {
            id: prev.length + 1,
            role: "model",
            parts: [{ text: response.message }],
          },
        ]);
      }
      setLoading(false);
      setImage(null); // Reset image after sending
    }
  };

  useEffect(() => {
    fetchChatHistory();
  }, [chatId]);

  const toggleDrop = () => {
    setDrop(!drop);
  };

  const handleUploadImage = (file) => {
    setImage(file[0]);
  };

  return (
    <div className="flex flex-col overflow-x-hidden h-full w-full bg-gradient-to-br from-gray-900 to-indigo-950 text-white font-sans">
      {/* Chat Area */}
      <div
        className={`flex flex-col  flex-1 overflow-y-auto max-w-[100%] p-4 md:p-6 space-y-6 custom-scrollbar ${
          drop ? "opacity-40" : "opacity-100"
        } transition-opacity duration-300`}
      >
        {chat?.map((msg, idx) => (
          <div
            key={idx}
            className={`flex  ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={` inline-block overflow-x-scroll px-4 py-2 rounded-3xl shadow-lg transition-all duration-200 hover:shadow-xl ${
                msg.role === "user"
                  ? "bg-gradient-to-r from-indigo-500 to-blue-500 text-white  max-w-[70%] no-scrollbar"
                  : "bg-gray-800/80 text-gray-100 custom-scrollbar"
              }`}
            >
              {msg.parts[0]?.image && (
                <img
                  src={msg.parts[0]?.image}
                  alt="chat media"
                  className="w-48 h-32 rounded-lg mb-2 object-cover"
                />
              )}
              <Markdown
              className=""
                children={msg.parts[0].text}
                components={{
                  code({ inline, className, children }) {
                    const language =
                      className?.replace("language-", "") || "text";
                    return !inline ? (
                      <SyntaxHighlighter style={dracula} language={language}>
                        {String(children).trim()}
                      </SyntaxHighlighter>
                    ) : (
                      <code>{children}</code>
                    );
                  },
                }}
              />
            </div>
          </div>
        ))}
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
        <div className="flex items-center gap-1 sm:gap-3 max-w-4xl mx-auto bg-gray-800/50 backdrop-blur-md p-2 border border-gray-600 rounded-full shadow-2xl">
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
            className="flex-1 px-1 py-2 sm:px-4  text-white placeholder-gray-400 focus:outline-none text-sm md:text-base"
          />
          <button
            onClick={handleSendMessage}
            disabled={loading}
            className="p-1 md:p-3 rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <AiOutlineSend size={20} className="size-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatArea;
