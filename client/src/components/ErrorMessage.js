import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiAlertCircle, FiX, FiRefreshCw } from 'react-icons/fi';

const ErrorMessage = ({ message, onResendEmail, onClose }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
        className="fixed top-20 right-0 z-50 w-full sm:w-96 max-w-full pr-2 sm:pr-4 md:pr-6 lg:pr-8"
      >
        <div className="bg-red-50 border-l-4 sm:border-l-8 border-red-500 rounded-lg p-3 sm:p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FiAlertCircle className="text-red-500 w-5 h-5 sm:w-6 sm:h-6 mr-2" />
              <span className="text-red-800 font-bold font-[Poppins] text-sm sm:text-base">Error</span>
            </div>
            <button
              onClick={onClose}
              className="text-red-500 hover:text-red-700 transition-colors duration-300"
            >
              <FiX className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
          <p className="mt-2 text-red-700 font-[Poppins] text-xs sm:text-sm">{message}</p>
          {onResendEmail && (
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onResendEmail}
              className="mt-3 bg-red-500 text-white py-1.5 sm:py-2 px-3 sm:px-4 rounded-full flex items-center justify-center w-full font-[Poppins] text-xs sm:text-sm font-medium hover:bg-red-600 transition-colors duration-300"
            >
              <FiRefreshCw className="mr-1.5 sm:mr-2 w-3 h-3 sm:w-4 sm:h-4" />
              Resend Verification Email
            </motion.button>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ErrorMessage;