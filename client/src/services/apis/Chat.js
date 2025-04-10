import { toast } from "react-toastify";
import { apiConnecter } from "../axios";

export const sendMessage = async (formData) => {
    const token = localStorage.getItem("token") ? localStorage.getItem("token") : null; 
    const text = formData.get("text")
    const image = formData.get("image")
    const chatId = formData.get("chatId")
    console.log("yha pe", image);

    if (!formData) {
        return toast.error("All field require");
    }

    const response = await apiConnecter("POST", `${import.meta.env.VITE_API_URL}/chat/send-message`, { text, image, chatId }, { "Content-Type": "multipart/form-data", 'Authorization': 'Bearer ' + token, });

    if (!response.data.success) {
        return toast.error(response.data.message);
    }

    return response.data;
}

export const getAllChats = async () => {

    const response = await apiConnecter("POST", `${import.meta.env.VITE_API_URL}/chat/user-chats`, {})

    if (!response.data.success) {
        toast.error(response.data.message);
    }

    return response.data;
}

export const getChatHistory = async (chatId) => {

    if (!chatId) {
        return toast.error("Chat id is required");
    }

    const response = await apiConnecter("POST", `${import.meta.env.VITE_API_URL}/chat/chat-history`, { chatId })

    if (!response.data.success) {
        toast.error(response.data.message);
    }

    return response.data

}