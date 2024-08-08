import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SymbolInfo } from 'react-ts-tradingview-widgets';

const CompanyPopup = ({ companySymbol, companyName, onClose, onPurchaseComplete }) => {
  const [stage, setStage] = useState('info');

  const handleBuy = () => {
    setStage('confirm');
  };

  const handleConfirm = () => {
    onPurchaseComplete(companyName, companySymbol);
    onClose();
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    >
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white p-8 rounded-2xl shadow-2xl w-11/12 md:w-2/3 lg:w-1/2 max-h-[90vh] overflow-y-auto"
      >
        <h2 className="text-3xl font-bold mb-6 text-gs-dark-green">{companyName}</h2>
        
        <div className="mb-6">
          <SymbolInfo symbol={companySymbol} width="100%" locale="en" colorTheme="light" />
        </div>
        
        {stage === 'info' && (
          <>
            <p className="mb-4">The current price of one share of {companyName} stock is called the <strong>market price</strong>.</p>
            <p className="mb-4">This is the price at which you can buy or sell the stock right now.</p>
            <div className="flex justify-between mt-8">
              <button 
                onClick={onClose}
                className="text-gs-dark-gray hover:text-gs-dark-green transition-colors duration-300"
              >
                Close
              </button>
              <button 
                onClick={() => setStage('buy')}
                className="bg-gs-dark-green text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-gs-light-green transition-colors duration-300"
              >
                Buy 1 Share
              </button>
            </div>
          </>
        )}

        {stage === 'buy' && (
          <div className="mt-6">
            <p className="text-lg mb-4">
              You're about to buy 1 share of {companyName} at the current market price.
            </p>
            <p className="text-lg mb-4">
              The price you pay for this share will be your <strong>cost basis</strong>. This is your initial investment in the stock.
            </p>
            <div className="flex justify-between">
              <button 
                onClick={() => setStage('info')}
                className="text-gs-dark-gray hover:text-gs-dark-green transition-colors duration-300"
              >
                Back
              </button>
              <button 
                onClick={handleBuy}
                className="bg-gs-dark-green text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-gs-light-green transition-colors duration-300"
              >
                Confirm Purchase
              </button>
            </div>
          </div>
        )}

        {stage === 'confirm' && (
          <div className="mt-6">
            <p className="text-2xl font-semibold mb-4 text-gs-dark-green">
              Congratulations!
            </p>
            <p className="text-lg mb-4">
              You are now the proud owner of 1 share of {companyName}!
            </p>
            <p className="text-lg mb-6">
              When you simplify it down to its basics, it turns out that the stock market is easy after all.
            </p>
            <div className="flex justify-between">
              <button 
                onClick={handleConfirm}
                className="bg-gs-dark-green text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-gs-light-green transition-colors duration-300"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default CompanyPopup;
