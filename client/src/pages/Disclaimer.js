import React from 'react';

const DisclaimerModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl h-[70vh] flex flex-col font-[Poppins]">
        <div className="p-6 border-b">
          <h2 className="text-3xl font-medium text-black">Disclaimer</h2>
        </div>
        <div className="flex-grow overflow-y-auto p-6 text-gray-800">
          <p className="mb-4">
            The content contained on the Website is for informational and educational purposes only. You should not construe any information found on the Website as investment, financial, legal, or other professional advice. Nothing contained on the Website constitutes a solicitation, recommendation, endorsement, or offer by the Company or any third-party service provider to buy or sell any securities or other financial instruments in this or in any other jurisdiction in which such solicitation or offer would be unlawful under the securities laws of such jurisdiction.
          </p>
          <p className="mb-4">
            All content on the Website is of a general nature and does not address the circumstances of any particular individual or entity. The content provided is designed to enhance your understanding of financial markets, but it is not intended to be a substitute for professional advice. Nothing in the Website constitutes professional and/or financial advice, and there is no assurance or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the Website.
          </p>
          <p className="mb-4">
            You should consult with a qualified financial advisor or other professional to determine what may be best for your individual needs. The Company does not endorse or recommend any specific financial products, investments, or strategies.
          </p>
          <p className="mb-4">
            Under no circumstance shall the Company have any liability to you for any loss or damage of any kind incurred as a result of the use of the Website or reliance on any information provided on the Website. Your use of the Website and your reliance on any information on the Website is solely at your own risk.
          </p>
        </div>
        <div className="p-6 border-t flex justify-center">
          <button
            onClick={onClose}
            className="bg-black border-2 border-black text-white font-bold py-2 px-6 rounded-md hover:text-black hover:bg-white transition-colors duration-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default DisclaimerModal;