import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const SuccessPage = ({ user, fetchUpdatedUser }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.id) {
      fetchUpdatedUser(user.id).then(() => {
        const timer = setTimeout(() => {
          navigate('/dashboard');
        }, 3000);

        return () => clearTimeout(timer);
      });
    }
  }, [user, fetchUpdatedUser, navigate]);

  return (
    <>
      <Helmet>
        <title>Payment Successful - Greenstick</title>
      </Helmet>
      <div className="min-h-screen bg-white flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl w-full">
          <h1 className="text-sm uppercase tracking-wider text-gs-dark-green mb-2 font-[Poppins]">Payment</h1>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-[Poppins] font-medium mb-12">Payment Successful.</h2>
          
          <div className="text-lg sm:text-xl font-[Poppins] text-gray-800 space-y-6">
            <p>Thank you for your purchase. You will be redirected to your dashboard in 3 seconds...</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SuccessPage;