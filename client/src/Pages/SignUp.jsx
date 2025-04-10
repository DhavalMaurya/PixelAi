import React, { useState } from "react";
import { FaGoogle, FaApple, FaTwitter } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "../services/apis/User";

const SignUp = () => {

  const navigate= useNavigate();
  const [name , setName] = useState("");
  const [email , setEmail] = useState("");
  const [password , setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await signUp(name , email, password );
    console.log(response)
    if(response.success){
      navigate("/login");
    }
  }
  return (
    <div className="flex justify-center items-center h-[92%] bg-[#12183a]">
      <div className="max-w-sm bg-gradient-to-b from-[#1e244a] to-[#12183a] rounded-2xl p-6 border border-gray-700 shadow-lg">
        {/* Heading */}
        <h1 className="text-center text-3xl font-bold text-white">Sign Up</h1>

        {/* Form */}
        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
             {/* Name Input */}
          <input
            type="text"
            value={name}
            onChange={(e)=>(setName(e.target.value))}
            placeholder="Name"
            required
            className="w-full bg-[#1e244a] text-white rounded-full px-6 py-3 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
          />
          {/* Email Input */}
          <input
            type="email"
            value={email}
            onChange={(e)=>(setEmail(e.target.value))}
            placeholder="E-mail"
            required
            className="w-full bg-[#1e244a] text-white rounded-full px-6 py-3 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
          />

          {/* Password Input */}
          <input
            type="password"
            value={password}
            onChange={(e)=>(setPassword(e.target.value))}
            placeholder="Password"
            required
            className="w-full bg-[#1e244a] text-white rounded-full px-6 py-3 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
          />

          {/* Forgot Password Link */}
          <span className="block text-right text-sm text-blue-400 hover:underline">
            <a href="#">Forgot Password?</a>
          </span>

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-bold py-3 rounded-full shadow-md hover:scale-105 transition-transform active:scale-95"
          >
            Sign up
          </button>
        </form>

        {/* Agreement Link */}
        <span className="block text-center text-xs text-blue-400 hover:underline mt-4">
          <Link to={"/login"}>Already have an account ? Login</Link>
        </span>
      </div>
    </div>
  );
};

export default SignUp;