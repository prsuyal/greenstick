import React, { useState } from 'react';
import { SymbolInfo } from 'react-ts-tradingview-widgets';

const SellPopup = ({ companySymbol, companyName, onSellComplete }) => {
  const [stage, setStage] = useState('info');

  const handleSell = () => {
    setStage('confirm');
  };

  const handleConfirm = () => {
    onSellComplete();
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg mt-4">
      <h2 className="text-2xl font-bold mb-6 text-gs-dark-green">{companyName}</h2>
      
      <div className="mb-6">
        <SymbolInfo symbol={companySymbol} width="100%" locale="en" colorTheme="light" />
      </div>
      
      {stage === 'info' && (
        <>
          <p className="mb-4">The current price of one share of {companyName} stock is called the <strong>market price</strong>.</p>
          <p className="mb-4">This is the price at which you can sell the stock right now.</p>
          <div className="flex justify-end mt-8">
            <button 
              onClick={() => setStage('sell')}
              className="bg-gs-dark-green text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-gs-light-green transition-colors duration-300"
            >
              Sell 1 Share
            </button>
          </div>
        </>
      )}

      {stage === 'sell' && (
        <div className="mt-6">
          <p className="text-lg mb-4">
            You're about to sell 1 share of {companyName} at the current market price.
          </p>
          <p className="text-lg mb-4">
            The price you receive for this share will be your <strong>sell price</strong>. This will determine your gain or loss from this transaction.
          </p>
          <div className="flex justify-end">
            <button 
              onClick={handleSell}
              className="bg-gs-dark-green text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-gs-light-green transition-colors duration-300"
            >
              Confirm Sale
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
            You have successfully sold 1 share of {companyName}!
          </p>
          <p className="text-lg mb-6">
            Click complete to move on.
          </p>
          <div className="flex justify-end">
            <button 
              onClick={handleConfirm}
              className="bg-gs-dark-green text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-gs-light-green transition-colors duration-300"
            >
              Complete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellPopup;
