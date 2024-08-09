import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import gsLogoBlack from "../assets/images/logo-black.svg";
import Footer from "../components/common/Footer";
import { Helmet } from 'react-helmet';
import ReCAPTCHA from "react-google-recaptcha";
import ErrorMessage from "../components/ErrorMessage"; 

const LoginPage = ({ onLogin }) => {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const recaptchaRef = useRef();
  const [errorMessage, setErrorMessage] = useState(null); 
  const [showResendButton, setShowResendButton] = useState(false);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const recaptchaValue = recaptchaRef.current.getValue();
    if (!recaptchaValue) {
      setErrorMessage("Please complete the reCAPTCHA");
      return;
    }
    try {
      const response = await fetch('https://api.greenstickusa.com/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...userData,
          recaptchaToken: recaptchaValue
        })
      });
      const responseData = await response.json();
      if (response.ok) {
        onLogin(responseData.user); 
        navigate("/dashboard");
      } else if (response.status === 403) {
        setErrorMessage("Please verify your email before logging in. Check your inbox for the verification link.");
        setShowResendButton(true);
        recaptchaRef.current.reset();
      } else {
        setErrorMessage(responseData.message || "Failed to log in");
        recaptchaRef.current.reset();
      }
    } catch (error) {
      setErrorMessage("Network error, please try again later.");
      recaptchaRef.current.reset();
    }
  };

  const handleResendEmail = async () => {
    try {
      const response = await fetch('https://api.greenstickusa.com/api/auth/resend-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userData.email })
      });
      if (response.ok) {
        setErrorMessage("Verification email resent. Please check your inbox.");
        setShowResendButton(false);
      } else {
        setErrorMessage("Failed to resend verification email. Please try again later.");
      }
    } catch (error) {
      setErrorMessage("Network error, please try again later.");
    }
  };

  const handleForgotPassword = async () => {
    const email = prompt("Please enter your email:");
    if (email) {
      try {
        const response = await fetch('https://api.greenstickusa.com/api/auth/forgot-password', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email })
        });
        const responseData = await response.json();
        if (response.ok) {
          alert("Password reset link has been sent to your email.");
        } else {
          alert(responseData.message || "Failed to send password reset link.");
        }
      } catch (error) {
        alert("Network error, please try again later.");
      }
    }
  };

  return (
    <>
    <Helmet>
        <title>Log in - Greenstick</title>
    </Helmet>
    <div className="flex flex-col relative min-h-screen bg-white">
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

      <div className="mb-24 md:mb-32 lg:mb-36 flex-grow pt-32 md:pt-36 lg:pt-44 px-4 sm:px-6 lg:px-8 bg-white min-h-screen">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl border-solid border-black border-2">
          <h1 className="text-center text-4xl font-medium font-[Poppins] text-black mb-8">Log in to Greenstick</h1>
          <div>
          {errorMessage && (
                <ErrorMessage 
                  message={errorMessage}
                  onResendEmail={showResendButton ? handleResendEmail : null}
                  onClose={() => setErrorMessage(null)}
                />
              )}
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
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey='6LfiZh4qAAAAAC0VLWt_g9jiXZ7gNkW47Of2MhA3'
                />
                <button
                  type="submit"
                  className="w-full p-3 bg-gs-light-green text-white rounded-md hover:bg-gs-dark-green transition-colors duration-300 font-semibold"
                >
                  Log in
                </button>
              </form>
              <div className="pt-8 flex flex-col justify-center space-y-4">
              <div className="text-center">
                    <Link to="/forgot-password" className="font-medium text-gs-dark-green hover:underline">
                      Forgot Password?
                    </Link>
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
      </div>

      <Footer />
    </div>
    </>
  );
};

export default LoginPage;
