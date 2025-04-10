import React from "react";
import { HiOutlineUser, HiOutlineCog } from "react-icons/hi";
import { FaBars, FaTimes } from "react-icons/fa"; // Added for mobile menu toggle
import { useState } from "react";
import {Link} from "react-router-dom"

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-gray-900 via-gray-850 to-indigo-950  h-[8%] p-3 border-b border-gray-700/50  top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        
        {/* Brand Name */}
       <Link to={"/"}>
       <h1 className="text-2xl font-extrabold text-white tracking-tight">
          PixelAi
          <span className="bg-gradient-to-r from-blue-500 to-indigo-500 text-transparent bg-clip-text">
            .
          </span>
        </h1>
       </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex space-x-8">
          <button className="flex items-center text-gray-300 hover:text-white transition-all duration-300 group">
            <HiOutlineUser className="mr-2 text-xl group-hover:text-blue-400 transition-colors duration-300" />
            <span className="relative">
              Profile
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
            </span>
          </button>
          <button className="flex items-center text-gray-300 hover:text-white transition-all duration-300 group">
            <HiOutlineCog className="mr-2 text-xl group-hover:text-blue-400 transition-colors duration-300" />
            <span className="relative">
              Settings
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
            </span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-300 hover:text-white transition-colors duration-200"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`${
          isMobileMenuOpen ? "flex" : "hidden"
        } md:hidden flex-col items-center bg-gray-900/95 backdrop-blur-md p-4 space-y-4 absolute top-[8%] left-0 w-full border-t border-gray-700/50 shadow-md transition-all duration-300`}
      >
        <button className="flex items-center text-gray-300 hover:text-white transition-all duration-300 w-full justify-center py-2 group">
          <HiOutlineUser className="mr-2 text-xl group-hover:text-blue-400" />
          <span>Profile</span>
        </button>
        <button className="flex items-center text-gray-300 hover:text-white transition-all duration-300 w-full justify-center py-2 group">
          <HiOutlineCog className="mr-2 text-xl group-hover:text-blue-400" />
          <span>Settings</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
