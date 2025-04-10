import { apiConnecter } from "../axios"
import { toast } from "react-toastify"

export const login = async (email, password) => {

     try {
        if (!email || !password) {
            return toast.error("All fields require");
        }

        const response = await apiConnecter("POST", ` ${import.meta.env.VITE_API_URL}/auth/login`, { email, password });

        if (!response.data.success) {
            console.log("iske under me ha")
            return toast.error(response.data.message);
        }

        localStorage.setItem("token", JSON.stringify(response.data.token));
        localStorage.setItem("user", JSON.stringify(response.data.user));

        toast.success(response.data.message);
        console.log("yha ha", response  );
        return response.data
     } catch (error) {
        console.log(error);
        return toast.error(error.response.data.message)
     }
}

export const signUp = async (name, email, password) => {

    if (!name || !email || !password) {
        return toast.error("All fields require");
    }

    const response = await apiConnecter("POST", `${import.meta.env.VITE_API_URL}/auth/sign-up`, { name, email, password });

    if (!response.data.success) {
        toast.error(response.data.message);
        return toast.error(response.data.message);
    }

    toast.success(response.data.message);
    return response.data

}