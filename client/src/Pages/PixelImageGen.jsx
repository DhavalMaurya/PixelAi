import React, { useState } from "react";
import { BsDownload } from "react-icons/bs";

const PixelImageGen = () => {
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState(
    "https://www.contentviewspro.com/wp-content/uploads/2017/07/default_image.png"
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-950 text-white flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-4xl bg-gray-900/80 backdrop-blur-2xl rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:shadow-3xl">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-blue-600 to-indigo-600">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center text-white">
            PixelAI Image Creator
          </h1>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row">
          {/* Image Preview (Left Side) */}
          <div className="lg:w-1/2 p-6 flex items-center justify-center relative">
            <img
              src={imageUrl}
              alt="Generated"
              className="w-full h-auto max-h-80 object-cover rounded-lg border border-gray-700 shadow-lg transition-transform duration-300 hover:scale-105"
            />
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900/70 rounded-lg">
                <svg
                  className="w-12 h-12 text-blue-400 animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8h8a8 8 0 01-16 0z"
                  />
                </svg>
              </div>
            )}
          </div>

          {/* Form and Buttons (Right Side) */}
          <div className="lg:w-1/2 p-6 space-y-6">
            {/* Name Field */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Image Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800/50 text-gray-200 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-200 placeholder-gray-600 shadow-sm"
                placeholder="Name your image..."
              />
            </div>

            {/* Prompt Field */}
            <div>
              <label
                htmlFor="prompt"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Prompt
              </label>
              <textarea
                id="prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800/50 text-gray-200 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-200 placeholder-gray-600 shadow-sm resize-none"
                rows="3"
                placeholder="Describe your vision..."
              />
            </div>

            {/* Surprise Me Button */}
            <button
              className="w-full py-2 bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white font-semibold rounded-lg shadow-md transition-all duration-300 hover:scale-105"
            >
              Surprise Me
            </button>

            {/* Generate Button */}
            <button
              // onClick={handleGenerate}
              className={`w-full py-3 rounded-lg font-semibold text-white shadow-lg transition-all duration-300 ${
                loading
                  ? "bg-gray-700 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:scale-105"
              }`}
            >
              {loading ? "Generating..." : "Create Image"}
            </button>

            {/* Download Button */}
            <button
              // onClick={() => download(imageUrl)}
              className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 hover:scale-105"
            >
              Download <BsDownload className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PixelImageGen;