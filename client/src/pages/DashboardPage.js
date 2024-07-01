import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import gsLogoBlack from "../assets/images/logo-black.svg";
import CountdownTimer from "../components/CountdownTimer";

const DashboardPage = ({ user, onLogout }) => {
  const [currentUser, setCurrentUser] = useState(user);
  const navigate = useNavigate();
  const greetingRef = useRef(null);
  const planBoxRef = useRef(null);
  const footerRef = useRef(null);

  useEffect(() => {
    const timeline = gsap.timeline({ defaults: { ease: "back.out(1.7)" } });

    timeline
      .fromTo(greetingRef.current, { opacity: 0, y: -50 }, { opacity: 1, y: 0, duration: 0.7 })
      .fromTo(planBoxRef.current, { opacity: 0, y: -30 }, { opacity: 1, y: 0, duration: 0.7 }, "-=0.3")
      .fromTo(footerRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7 }, "-=0.3");

  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="fixed top-0 left-0 w-full z-50 px-4 py-2 sm:py-3 bg-white border-y">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <img
            src={gsLogoBlack}
            alt="Greenstick logo"
            className="h-8 sm:h-10 md:h-12 cursor-pointer"
            onClick={() => navigate("/")}
          />
          <button
            onClick={onLogout}
            className="border-2 border-black text-black font-bold bg-white py-1 px-2 sm:px-3 sm:py-2 rounded-md font-[Poppins] hover:text-white hover:bg-black transition-colors duration-300"
          >
            Log out
          </button>
        </div>
      </div>

      <div className="flex-grow flex flex-col items-center justify-center px-4 pt-20">
        <h1 
          ref={greetingRef} 
          className="text-4xl sm:text-5xl md:text-6xl font-[Poppins] font-medium mb-12"
        >
          Hello, {currentUser.full_name}
        </h1>
        
        <div 
          ref={planBoxRef} 
          className="bg-gray-100 rounded-lg p-6 text-center"
        >
          <h2 className="text-4xl font-[Poppins] font-light mb-2">Your Plan</h2>
          <p className="text-2xl font-[Poppins] font-bold mb-4">{currentUser.plan || "None"}</p>
          <a 
            href="/pricing" 
            className="text-gs-dark-green hover:underline font-[Poppins] text-md"
          >
            View pricing options
          </a>
        </div>
      </div>

      <div ref={footerRef} className="mt-auto">
        <CountdownTimer />
      </div>
    </div>
  );
};

export default DashboardPage;