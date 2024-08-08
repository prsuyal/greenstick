import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const VerifyEmailPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState('Verifying your email...');

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await fetch(`https://api.greenstickusa.com/api/auth/verify-email/${token}`);
        const data = await response.json();
        if (response.ok) {
          setMessage('Email verified successfully. You can now log in.');
          setTimeout(() => navigate('/login'), 3000);
        } else {
          setMessage(data.message || 'Failed to verify email.');
        }
      } catch (error) {
        setMessage('An error occurred while verifying your email.');
      }
    };

    verifyEmail();
  }, [token, navigate]);

  return (
    <>
      <Helmet>
        <title>Verify Email - Greenstick</title>
      </Helmet>
      <div className="min-h-screen bg-white flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl w-full">
          <h1 className="text-sm uppercase tracking-wider text-gs-dark-green mb-2 font-[Poppins]">Email Verification</h1>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-[Poppins] font-medium mb-12">Verifying Your Email.</h2>
          
          <div className="text-lg sm:text-xl font-[Poppins] text-gray-800 space-y-6">
            <p>{message}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default VerifyEmailPage;