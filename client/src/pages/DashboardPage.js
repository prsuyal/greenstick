import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import gsLogoBlack from "../assets/images/logo-black.svg";
import CountdownTimer from "../components/CountdownTimer";
import { Helmet } from 'react-helmet';
import { FaUserGear, FaCreditCard, FaKey, FaArrowRightToBracket } from "react-icons/fa6";

const DashboardPage = ({ user, onLogout }) => {
  const [currentUser, setCurrentUser] = useState(user);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const navigate = useNavigate();
  const greetingRef = useRef(null);
  const planBoxRef = useRef(null);
  const footerRef = useRef(null);
  const settingsRef = useRef(null);

  useEffect(() => {
    const timeline = gsap.timeline({ defaults: { ease: "back.out(1.7)" } });

    timeline
      .fromTo(greetingRef.current, { opacity: 0, y: -50 }, { opacity: 1, y: 0, duration: 0.7 })
      .fromTo(planBoxRef.current, { opacity: 0, y: -30 }, { opacity: 1, y: 0, duration: 0.7 }, "-=0.3")
      .fromTo(footerRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7 }, "-=0.3");

    const handleClickOutside = (event) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target)) {
        setSettingsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSettingsClick = () => {
    setSettingsOpen(!settingsOpen);
  };

  const handleManageSubscription = async () => {
    try {
      const response = await fetch('https://api.greenstickusa.com/api/stripe/create-customer-portal-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: currentUser.id }),
      });

      if (response.ok) {
        const data = await response.json();
        window.location.href = data.url;
      } else {
        console.error('Failed to create customer portal session');
      }
    } catch (error) {
      console.error('Error creating customer portal session:', error);
    }
  };

  const handleChangePassword = () => {
    navigate('/forgot-password');
  };

  const level1Contents = [
    { title: 'Lesson 1A-1', route: '/level-1/a/lesson-1' },
    { title: 'Quiz 1A-1', route: '/level-1/a/quiz-1' },
    { title: 'Lesson 1A-2', route: '/level-1/a/lesson-2' },
    { title: 'Quiz 1A-2', route: '/level-1/a/quiz-2' },
    { title: 'Lesson 1B-1', route: '/level-1/b/lesson-1' },
    { title: 'Quiz 1B-1', route: '/level-1/b/quiz-1' },
    { title: 'Lesson 1B-2', route: '/level-1/b/lesson-2' },
    { title: 'Quiz 1B-2', route: '/level-1/b/quiz-2' },
    { title: 'Lesson 1C-1', route: '/level-1/c/lesson-1' },
    { title: 'Quiz 1C-1', route: '/level-1/c/quiz-1' },
    { title: 'Lesson 1C-2', route: '/level-1/c/lesson-2' },
    { title: 'Quiz 1C-2', route: '/level-1/c/quiz-2' },
  ];

  return (
    <>
      <Helmet>
        <title>Dashboard - Greenstick</title>
      </Helmet>
      <div className="min-h-screen bg-white flex flex-col">
        <div className="fixed top-0 left-0 w-full z-50 px-4 py-2 sm:py-3 bg-white border-b">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <img
              src={gsLogoBlack}
              alt="Greenstick logo"
              className="h-8 sm:h-10 md:h-12 cursor-pointer"
              onClick={() => navigate("/")}
            />
            <div className="flex items-center space-x-4">
              <div className="relative" ref={settingsRef}>
                <button 
                  onClick={handleSettingsClick} 
                  className="text-black hover:text-gs-dark-green transition-colors duration-300"
                  aria-label="Settings"
                >
                  <FaUserGear size={24} />
                </button>
                {settingsOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white border rounded-md shadow-lg z-50 overflow-hidden">
                    <div className="py-2">
                      <button
                        onClick={handleManageSubscription}
                        className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors duration-200"
                      >
                        <FaCreditCard className="mr-3 text-gs-dark-green" />
                        <span>Manage Payment</span>
                      </button>
                      <button
                        onClick={handleChangePassword}
                        className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors duration-200"
                      >
                        <FaKey className="mr-3 text-gs-dark-green" />
                        <span>Change Password</span>
                      </button>
                      <button
                        onClick={onLogout}
                        className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors duration-200"
                      >
                        <FaArrowRightToBracket className="mr-3 text-gs-dark-green" />
                        <span>Log out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mb-24 md:mb-32 lg:mb-36 flex-grow pt-32 md:pt-36 lg:pt-44 flex flex-col items-center justify-center px-4">
          <h1 
            ref={greetingRef} 
            className="text-4xl sm:text-5xl md:text-6xl font-[Poppins] font-medium mb-12"
          >
            Hello, {currentUser.full_name}!
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
    </>
  );
};

export default DashboardPage;