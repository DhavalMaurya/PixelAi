import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
// import { UserProvider } from "./context/User.js";
// import { ChatProvider } from "./context/Chat.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      {/* <UserProvider> */}
      <ToastContainer position="top-center"/>
        <App />
      {/* </UserProvider> */}
    </BrowserRouter>
  </StrictMode>
);
