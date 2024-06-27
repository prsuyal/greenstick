import React from 'react';
import { useNavigate } from 'react-router-dom';
import gsLogoBlack from "../../assets/images/logo-black.svg";
import "../../assets/styles/customStyles.css";

const AuthenticatedNavbar = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/home");
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50 px-4 py-2 sm:py-3 bg-white border-y">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <img
          src={gsLogoBlack}
          alt="Greenstick logo"
          className="h-8 sm:h-10 md:h-12 cursor-pointer"
          onClick={handleLogoClick}
        />
        <div className="flex items-center space-x-2 sm:space-x-4">
          <button
            className="bg-black border-2 border-black text-white font-bold py-1 px-2 sm:px-3 sm:py-2 rounded-md hover:text-black hover:bg-white transition-colors duration-300"
            onClick={onLogout}
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthenticatedNavbar;
