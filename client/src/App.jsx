import React, { useState } from "react";
import "./App.css";
import PixelChat from "./Pages/PixelChat";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import ChatArea from "./components/ChatArea";
import NewChat from "./components/NewChat";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Home from "./Pages/Home";
import PixelImageGen from "./Pages/PixelImageGen";

function App() {
  return (
    <div className="h-[100vh]">
      <Navbar />
      <Routes>
        <Route path="/pixelchat" element={<PixelChat />}>
          <Route path={`/pixelchat:chatId`} element={<ChatArea />} />
          <Route path={`/pixelchat`} element={<NewChat />} />
        </Route>
        <Route path="/" element={<Home />} />
        <Route path="/image-gen" element={<PixelImageGen />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
