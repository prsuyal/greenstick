import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const CanceledPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Payment Canceled - Greenstick</title>
      </Helmet>
      <div className="min-h-screen bg-white flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl w-full">
          <h1 className="text-sm uppercase tracking-wider text-gs-dark-green mb-2 font-[Poppins]">Payment</h1>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-[Poppins] font-medium mb-12">Payment Canceled.</h2>
          
          <div className="text-lg sm:text-xl font-[Poppins] text-gray-800 space-y-6">
            <p>Your payment was canceled. If you have any questions, please contact support at <a href="mailto:support@greenstickusa.com" className="text-gs-dark-green hover:underline">support@greenstickusa.com</a>.</p>
          </div>

          <button 
            onClick={() => navigate("/pricing")}
            className="mt-12 bg-gs-light-green border-2 border-gs-light-green text-black font-bold py-3 px-6 rounded-md hover:text-black hover:bg-gs-dark-green hover:border-gs-dark-green transition-colors duration-300"
          >
            Return to Pricing
          </button>
        </div>
      </div>
    </>
  );
};

export default CanceledPage;