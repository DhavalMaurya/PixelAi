import React from "react";
import { Link } from "react-router-dom";
import { HiOutlineChat, HiOutlineSparkles, HiOutlineArrowRight } from "react-icons/hi";
import { FaImage } from "react-icons/fa6";

const Home = () => {
  return (
    <div className="min-h-screen max-w-[100%] bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-950 text-white font-sans flex flex-col">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-4 py-12 sm:py-16">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 sm:mb-8 bg-gradient-to-r from-blue-400 to-indigo-400 text-transparent bg-clip-text max-w-full break-words">
          Welcome to PixelAI
        </h2>
        <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-full sm:max-w-2xl mb-8 sm:mb-10 px-2 break-words">
          Your intelligent chatbot companion powered by cutting-edge AI. Chat, upload images, and explore with ease.
        </p>
        <Link
          to= {`${localStorage.getItem("token") ? "/pixelchat" : "/login"}`}
          className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 shadow-lg hover:shadow-xl text-base sm:text-lg"
        >
          Get Started <HiOutlineSparkles className="ml-2" />
        </Link>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6">
        <h3 className="text-2xl sm:text-3xl font-semibold text-center mb-10 sm:mb-12 text-gray-200 max-w-full break-words">
          Why PixelAI?
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 w-full max-w-full sm:max-w-5xl mx-auto px-2">
          <div className="p-6 bg-gray-800/50 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
            <HiOutlineChat className="w-10 h-10 sm:w-12 sm:h-12 text-blue-400 mb-4 mx-auto" />
            <h4 className="text-lg sm:text-xl font-medium mb-2 text-white">Smart Conversations</h4>
            <p className="text-sm sm:text-base text-gray-400 break-words">
              Engage in natural, intelligent chats with our advanced AI.
            </p>
          </div>
          <div className="p-6 bg-gray-800/50 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
            <FaImage className="w-10 h-10 sm:w-12 sm:h-12 text-blue-400 mb-4 mx-auto" />
            <h4 className="text-lg sm:text-xl font-medium mb-2 text-white">Image Input</h4>
            <p className="text-sm sm:text-base text-gray-400 break-words">
              Upload images to enhance your chats and interactions.
            </p>
          </div>
          <div className="p-6 bg-gray-800/50 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
            <HiOutlineSparkles className="w-10 h-10 sm:w-12 sm:h-12 text-blue-400 mb-4 mx-auto" />
            <h4 className="text-lg sm:text-xl font-medium mb-2 text-white">Fast & Easy</h4>
            <p className="text-sm sm:text-base text-gray-400 break-words">
              Get instant responses and a seamless user experience.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="p-4 sm:p-6 text-center text-gray-400 text-sm sm:text-base border-t border-gray-700/50">
        <p>© 2025 PixelAI. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;