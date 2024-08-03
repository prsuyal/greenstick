import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const CheckEmailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || "your email";

  return (
    <>
      <Helmet>
        <title>Check Your Email - Greenstick</title>
      </Helmet>
      <div className="min-h-screen bg-white flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl w-full">
          <h1 className="text-sm uppercase tracking-wider text-gs-dark-green mb-2 font-[Poppins]">Email Verification</h1>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-[Poppins] font-medium mb-12">Check Your Email.</h2>
          
          <div className="text-lg sm:text-xl font-[Poppins] text-gray-800 space-y-6">
            <p>We've sent a verification link to: <strong>{email}</strong></p>
            <p>Please check your inbox and click the link to verify your account.</p>
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

export default CheckEmailPage;