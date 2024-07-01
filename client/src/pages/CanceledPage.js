import React from 'react';
import { Link } from 'react-router-dom';

const CanceledPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white font-[Poppins] px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full text-center bg-white p-8 rounded-xl border-solid border-black border-2 shadow-md">
        <h1 className="text-4xl font-medium mb-4">Payment Canceled</h1>
        <p className="text-xl mb-8">Your payment was canceled. If you have any questions, please contact support at <a href="mailto:support@greenstickusa.com" className="text-gs-dark-green hover:underline">support@greenstickusa.com</a>.</p>
        <Link to="/pricing" className="text-gs-dark-green hover:underline text-lg font-semibold">Return to Pricing</Link>
      </div>
    </div>
  );
};

export default CanceledPage;
