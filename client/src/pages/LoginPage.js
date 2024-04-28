import React from "react";
import { Link } from "react-router-dom";
import "../assets/styles/customStyles.css";
import googleIcon from "../assets/images/icons8-google.svg";
import appleIcon from "../assets/images/icons8-apple-logo.svg";

const LoginPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <div className="typewriter mb-8">
        <h1 className="text-6xl font-bold font-[Poppins]">
          <span className="text-gs-blueish-black">Welcome back to</span>
          <span className="text-gs-dark-green"> Greenstick</span>
        </h1>
      </div>
      <div className="w-full max-w-md p-8 text-center border rounded-xl shadow-xl">
        <h2 className="text-3xl font-bold font-[Poppins] text-gs-blueish-black mb-6">
          Log into your account
        </h2>
        <div className="space-y-4">
          <button className="font-[Poppins] w-full flex items-center justify-center p-3 bg-gs-ultralight-green text-gs-blueish-black rounded-md transition-colors hover:bg-gs-grayish-green">
            <img src={googleIcon} alt="Google" className="w-4 h-4 mr-2" />
            Login with Google
          </button>
          <button className="font-[Poppins] w-full flex items-center justify-center p-3 bg-gs-ultralight-green text-gs-blueish-black rounded-md transition-colors hover:bg-gs-grayish-green">
            <img src={appleIcon} alt="Apple" className="w-4 h-4 mr-2" />
            Login with Apple
          </button>
          <button className="font-[Poppins] w-full flex items-center justify-center p-3 bg-gs-ultralight-green text-gs-blueish-black rounded-md transition-colors hover:bg-gs-grayish-green">
            Login with Email
          </button>
        </div>
        <p className="mt-4 text-gs-dark-gray font-[Poppins]">
          Don't have an account yet?{" "}
          <Link
            to="/register"
            className="font-[Poppins] font-medium text-gs-dark-green hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
