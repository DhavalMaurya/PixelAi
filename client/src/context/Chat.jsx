import React, { useState } from "react";

import { createContext} from "react"

export const ChatContext = createContext();

export const ChatProvider = ({children}) => {
    const [chatId , setChatId] = useState("");

    return(
        <ChatContext.Provider value={{chatId , setChatId}}>
            {children}
        </ChatContext.Provider>
    )

}