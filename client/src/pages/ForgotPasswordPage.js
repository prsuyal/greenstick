import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import ErrorMessage from "../components/ErrorMessage"; 

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://api.greenstickusa.com/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      if (response.ok) {
        setMessage("A password reset link has been sent to your email.");
      } else {
        setErrorMessage("Failed to send password reset link. Please try again.");
      }
    } catch (error) {
      setErrorMessage("Network error, please try again later.");
    }
  };

  return (
    <>
      <Helmet>
        <title>Forgot Password - Greenstick</title>
      </Helmet>
      <div className="min-h-screen bg-white flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl w-full">
          <h1 className="text-sm uppercase tracking-wider text-gs-dark-green mb-2 font-[Poppins]">Password Recovery</h1>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-[Poppins] font-medium mb-12">Forgot Your Password?</h2>
          
          <div className="text-lg sm:text-xl font-[Poppins] text-gray-800 space-y-6">
            <p>Enter your email address below and we'll send you a link to reset your password.</p>
            
            {errorMessage && <ErrorMessage message={errorMessage} />}
            
            <form onSubmit={handleSubmit} className="space-y-6 mt-8">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 font-[Poppins]">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-gs-dark-green focus:border-gs-dark-green"
                />
              </div>
              <button
                type="submit"
                className="w-full p-3 bg-gs-light-green text-white rounded-md hover:bg-gs-dark-green transition-colors duration-300 font-semibold font-[Poppins]"
              >
                Send Reset Link
              </button>
            </form>
            
            {message && (
              <div className="text-center mt-4 text-gs-dark-green font-[Poppins]">
                {message}
              </div>
            )}
          </div>

          <button 
            onClick={() => navigate("/login")}
            className="mt-12 bg-gs-light-green border-2 border-gs-light-green text-black font-bold py-3 px-6 rounded-md hover:text-black hover:bg-gs-dark-green hover:border-gs-dark-green transition-colors duration-300"
          >
            Return to Login
          </button>
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordPage;