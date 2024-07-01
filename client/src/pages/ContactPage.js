import React from "react";
import { useNavigate } from "react-router-dom";
import gsLogoBlack from "../assets/images/logo-black.svg";
import Footer from "../components/common/Footer";

const ContactPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col relative min-h-screen bg-white">
      <div className="fixed top-0 left-0 w-full z-50 px-4 py-2 sm:py-3 bg-white border-y">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <img
            src={gsLogoBlack}
            alt="Greenstick logo"
            className="h-8 sm:h-10 md:h-12 cursor-pointer"
            onClick={() => navigate("/")}
          />
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button
              className="bg-black border-2 border-black text-white font-bold py-1 px-2 sm:px-3 sm:py-2 rounded-md hover:text-black hover:bg-white transition-colors duration-300"
              onClick={() => navigate("/register")}
            >
              Register
            </button>
            <button
              className="border-2 border-black text-black font-bold bg-white py-1 px-2 sm:px-3 sm:py-2 rounded-md font-[Poppins] hover:text-white hover:bg-black transition-colors duration-300"
              onClick={() => navigate("/login")}
            >
              Log in
            </button>
          </div>
        </div>
      </div>

      <div className="flex-grow pt-32 md:pt-36 lg:pt-44 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-sm uppercase tracking-wider text-gs-dark-green mb-2 font-[Poppins]">Contact</h1>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-[Poppins] font-medium mb-12">Get in Touch</h2>
          
          <div className="text-lg sm:text-xl font-[Poppins] text-gray-800 space-y-6">
            <p>Have an inquiry? Want to talk to the founders? Want to submit a testimonial? We’d love to hear from you!</p>
          </div>

          <div className="mt-12 mb-24">
            <p className="text-2xl sm:text-3xl md:text-4xl font-[Poppins] font-medium text-center">
              Contact us at: <a href="mailto:support@greenstickusa.com" className="text-gs-dark-green hover:underline">support@greenstickusa.com</a>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ContactPage;
