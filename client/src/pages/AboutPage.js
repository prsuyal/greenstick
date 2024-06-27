import React from "react";
import { useNavigate } from "react-router-dom";
import gsLogoBlack from "../assets/images/logo-black.svg";
import Footer from "../components/common/Footer";

const AboutPage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-white">
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

      <div className="pt-32 md:pt-36 lg:pt-44 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-sm uppercase tracking-wider text-gs-dark-green mb-2 font-[Poppins]">About</h1>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-[Poppins] font-medium mb-12">Our Vision.</h2>
          
          <div className="text-lg sm:text-xl font-[Poppins] text-gray-800 space-y-6">
            <p>
              Here at Greenstick, we don't believe in lying to get you through the door. We won't say that we can make you an expert trader in seven days. We won't say that after learning through our platform, you will never make a mistake trading again. They're great goals, but in reality, the stock market isn't so simple.
            </p>
            <p>
              What we will say is that if you are willing to take the time to learn, Greenstick is the best platform for you. Our mission is to teach you about the stock market more comprehensively and effectively than we believe existing platforms ever could. Our #1 focus, above all else, is you and your success.
            </p>
          </div>

          <button 
            onClick={() => navigate("/register")}
            className="mt-12 mb-24 bg-gs-light-green border-2 border-gs-light-green text-black font-bold py-3 px-6 rounded-md hover:text-black hover:bg-gs-dark-green hover:border-gs-dark-green transition-colors duration-300"
          >
            Start your journey
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AboutPage;
