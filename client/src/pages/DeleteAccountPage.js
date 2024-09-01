import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import ErrorMessage from "../components/ErrorMessage";

const DeleteAccountPage = ({ user, onLogout }) => {
  const [isConfirming, setIsConfirming] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleDeleteAccount = async () => {
    if (!isConfirming) {
      setIsConfirming(true);
      return;
    }

    try {
      const response = await fetch(`https://api.greenstickusa.com/api/users/${user.id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (response.ok) {
        onLogout();
        navigate('/', { replace: true });
      } else if (response.status === 404) {
        setErrorMessage("Account not found. It may have already been deleted.");
      } else {
        const data = await response.json();
        setErrorMessage(data.error || "Failed to delete account. Please try again.");
      }
    } catch (error) {
      console.error('Error deleting account:', error);
      setErrorMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <>
      <Helmet>
        <title>Delete Account - Greenstick</title>
      </Helmet>
      <div className="min-h-screen bg-white flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl w-full">
          <h1 className="text-sm uppercase tracking-wider text-gs-dark-green mb-2 font-[Poppins]">Account Management</h1>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-[Poppins] font-medium mb-12">Delete Account</h2>
          
          <div className="text-lg sm:text-xl font-[Poppins] text-gray-800 space-y-6">
            <p>Warning: This action is irreversible. All your data will be permanently deleted.</p>
            
            {errorMessage && <ErrorMessage message={errorMessage} />}
            
            <form onSubmit={(e) => { e.preventDefault(); handleDeleteAccount(); }} className="space-y-6 mt-8">
              <button
                type="submit"
                className="w-full p-3 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-300 font-semibold font-[Poppins]"
              >
                {isConfirming ? 'Click again to confirm deletion' : 'Delete Account'}
              </button>
            </form>
          </div>
        </div>
        <button 
          onClick={() => navigate("/dashboard")}
          className="mt-12 bg-gs-light-green border-2 border-gs-light-green text-black font-bold py-3 px-6 rounded-md hover:text-black hover:bg-gs-dark-green hover:border-gs-dark-green transition-colors duration-300"
        >
          Return to Dashboard
        </button>
      </div>
    </>
  );
};

export default DeleteAccountPage;