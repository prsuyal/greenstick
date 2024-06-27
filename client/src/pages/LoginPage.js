import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import gsLogoBlack from "../assets/images/logo-black.svg";
import googleIcon from "../assets/images/icons8-google.svg";
import appleIcon from "../assets/images/icons8-apple-logo.svg";
import Footer from "../components/common/Footer";

const LoginPage = ({ onLogin }) => {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://www.api.greenstickusa.com/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      const responseData = await response.json();
      if (response.ok) {
        console.log('Login successful', responseData);
        onLogin(responseData.user); 
        navigate("/dashboard");
      } else {
        console.log('Login failed:', responseData.message);
        alert(responseData.message || "Failed to log in");
      }
    } catch (error) {
      console.error('Network request failed:', error);
      alert("Network error, please try again later.");
    }
  };  

  const handleForgotPassword = async () => {
    const email = prompt("Please enter your email:");
    if (email) {
      try {
        const response = await fetch('https://www.api.greenstickusa.com/api/auth/forgot-password', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email })
        });
        const responseData = await response.json();
        if (response.ok) {
          alert("Password reset link has been sent to your email.");
        } else {
          console.log('Password reset failed:', responseData.message);
          alert(responseData.message || "Failed to send password reset link.");
        }
      } catch (error) {
        console.error('Network request failed:', error);
        alert("Network error, please try again later.");
      }
    }
  };

  return (
    <div className="relative min-h-screen bg-white">
      <div className="fixed top-0 left-0 w-full z-50 px-4 py-2 sm:py-3 bg-white border-y">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <img
            src={gsLogoBlack}
            alt="Greenstick logo"
            className="h-8 sm:h-10 md:h-12 cursor-pointer"
            onClick={() => navigate("/")}
          />
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button
              className="bg-black border-2 border-black text-white font-bold py-1 px-2 sm:px-3 sm:py-2 rounded-md hover:text-black hover:bg-white transition-colors duration-300"
              onClick={() => navigate("/register")}
            >
              Register
            </button>
            <button
              className="border-2 border-black text-black font-bold bg-white py-1 px-2 sm:px-3 sm:py-2 rounded-md font-[Poppins] hover:text-white hover:bg-black transition-colors duration-300"
              onClick={() => navigate("/login")}
            >
              Log in
            </button>
          </div>
        </div>
      </div>

      <div className="pt-32 pb-32 md:pb-36 lg:pb-44 md:pt-36 lg:pt-44 px-4 sm:px-6 lg:px-8 bg-white min-h-screen">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl border-solid border-black border-2">
          <h1 className="text-center text-4xl font-medium font-[Poppins] text-black mb-8">Login to Greenstick</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={userData.email}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-gs-dark-green focus:border-gs-dark-green"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={userData.password}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-gs-dark-green focus:border-gs-dark-green"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full p-3 bg-gs-light-green text-white rounded-md hover:bg-gs-dark-green transition-colors duration-300 font-semibold"
                >
                  Log in
                </button>
              </form>
              <button
                onClick={handleForgotPassword}
                className="mt-4 text-gs-dark-green hover:underline"
              >
                Forgot Password?
              </button>
            </div>
            <div className="flex flex-col justify-center space-y-6">
              <div className="text-center">
                <p className="text-xl font-semibold mb-4">Or log in with</p>
                <div className="space-y-4">
                  <button
                    onClick={() => (window.location.href = 'https://www.api.greenstickusa.com/api/auth/google')}
                    className="w-full p-3 bg-white border border-gray-300 text-gray-700 rounded-md flex items-center justify-center space-x-2 hover:bg-gray-50 transition-colors duration-300"
                  >
                    <img src={googleIcon} alt="Google" className="h-6 w-6" />
                    <span>Google</span>
                  </button>
                  <button
                    onClick={() => (window.location.href = 'https://www.api.greenstickusa.com/api/auth/apple')}
                    className="w-full p-3 bg-white border border-gray-300 text-gray-700 rounded-md flex items-center justify-center space-x-2 hover:bg-gray-50 transition-colors duration-300"
                  >
                    <img src={appleIcon} alt="Apple" className="h-6 w-6" />
                    <span>Apple</span>
                  </button>
                </div>
              </div>
              <div className="text-center">
                <p className="text-gray-600">
                  Don't have an account?{" "}
                  <Link to="/register" className="font-medium text-gs-dark-green hover:underline">
                    Register
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LoginPage;