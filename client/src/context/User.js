import { createContext, useState } from "react";

export const UserContext = createContext()

export const UserProvider = ((children)=>{
    const [token , setToken] = useState(localStorage.getItem("token") ? localStorage.getItem(token) : null);

    return (
        <UserProvider value = {{token , setToken}}>
            {children}
        </UserProvider>
    )
})