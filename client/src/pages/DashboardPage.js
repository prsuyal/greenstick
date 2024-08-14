import React, { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import gsap from "gsap";
import gsLogoBlack from "../assets/images/logo-black.svg";
import { Helmet } from 'react-helmet';
import { FaUserGear, FaCreditCard, FaKey, FaArrowRightToBracket, FaEnvelope, FaLock } from "react-icons/fa6";
import DictionaryImage from '../assets/images/undraw_road_to_knowledge_m8s0.svg';
import ExoImage from '../assets/images/undraw_chat_bot_re_e2gj.svg';
import StockMarketImage from '../assets/images/undraw_stock_prices_re_js33.svg';
import CommunityImage from '../assets/images/undraw_social_friends_re_7uaa.svg';
import ExoLogo from '../assets/images/thinexologo.svg';

const DashboardPage = ({ user, onLogout }) => {
  const [currentUser, setCurrentUser] = useState(user);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const navigate = useNavigate();
  const greetingRef = useRef(null);
  const settingsMenuRef = useRef(null);
  const settingsButtonRef = useRef(null);

  useEffect(() => {
    if (user) {
      setCurrentUser(user);
    }
  }, [user]);

  useEffect(() => {
    const timeline = gsap.timeline({ defaults: { ease: "back.out(1.7)" } });
    timeline.fromTo(greetingRef.current, { opacity: 0, y: -50 }, { opacity: 1, y: 0, duration: 0.7 });

    const handleClickOutside = (event) => {
      if (
        settingsMenuRef.current &&
        !settingsMenuRef.current.contains(event.target) &&
        settingsButtonRef.current &&
        !settingsButtonRef.current.contains(event.target)
      ) {
        setSettingsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSettingsClick = (e) => {
    e.stopPropagation();
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

  const planHierarchy = ['Standard', 'Pro', 'Ultimate'];

  const DashboardCard = ({ title, content, requiredPlan, isAlwaysLocked = false }) => {
    const [isShaking, setIsShaking] = useState(false);
    const user = JSON.parse(localStorage.getItem('user'));
    
    const isLocked = useMemo(() => {
      if (isAlwaysLocked) return true;
      if (!user) return true;
      const userPlanIndex = planHierarchy.indexOf(user.plan);
      const requiredPlanIndex = planHierarchy.indexOf(requiredPlan);
      return userPlanIndex < requiredPlanIndex;
    }, [user, requiredPlan, isAlwaysLocked]);
  
    const handleLockedClick = () => {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    };
  
    return (
      <div className={`flex flex-col ${isLocked ? 'cursor-not-allowed' : ''}`}>
        <h2 className="text-2xl 2xl:text-3xl font-medium mb-3 2xl:mb-4">{title}</h2>
        <div 
          className={`bg-white rounded-xl p-6 2xl:p-8 h-64 2xl:h-80 relative overflow-hidden border border-gray-200 transition-all duration-300 
            ${isLocked ? 'hover:shake' : 'hover:scale-105 hover:shadow-lg'}
            ${isShaking ? 'animate-shake' : ''}`}
        >
          {content}
          {isLocked && (
            <button className="absolute top-2 2xl:top-4 right-2 2xl:right-4 bg-gray-200 p-2 2xl:p-3 rounded-full">
              <FaLock className="text-gray-600 2xl:text-xl" />
            </button>
          )}
          <div className="absolute bottom-8 2xl:bottom-10 left-0 right-0 h-px bg-gray-400"></div>
          
          {isLocked && (
            <div 
              className="absolute inset-0 bg-transparent"
              onClick={handleLockedClick}
            />
          )}
        </div>
      </div>
    );
  };

  const LearningCard = () => {
    const lessons = [
      { level: 1, sublevel: 'A', number: 1, title: 'Getting Started' },
      { level: 1, sublevel: 'A', number: 2, title: "Let's Understand the Market" },
      { level: 1, sublevel: 'B', number: 1, title: 'Breaking Down Stock Prices' },
      { level: 1, sublevel: 'B', number: 2, title: 'How to Make Money 101' },
      { level: 1, sublevel: 'C', number: 1, title: 'Charts+' },
      { level: 1, sublevel: 'C', number: 2, title: 'A Miscellaneous Masterclass' },
    ];
  
    const handleLessonClick = (lesson) => {
      navigate(`/level-${lesson.level}/${lesson.sublevel.toLowerCase()}/lesson-${lesson.number}`);
    };
  
    return (
      <div className="relative h-full flex flex-col">
        <div className="mb-4 2xl:mb-6">
          <p className="font-medium text-lg 2xl:text-2xl">Table of Contents</p>
          <p className="text-gray-500 text-sm 2xl:text-lg">Click on a lesson to start learning</p>
        </div>
        <div className="flex-grow overflow-y-auto custom-scrollbar mb-4">
          {lessons.map((lesson, index) => (
            <div
              key={index}
              className="hover:bg-gray-100 pb-2 2xl:pb-3 bg-white rounded-md pl-2 2xl:pl-3 duration-200 cursor-pointer mb-2 2xl:mb-3"
              onClick={() => handleLessonClick(lesson)}
            >
              <p className="2xl:text-lg">
                {`Level ${lesson.level}${lesson.sublevel}: Lesson ${lesson.number}`}
              </p>
              <p className="text-sm 2xl:text-base text-gray-600">{lesson.title}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  const DictionaryCard = () => (
    <div className="relative h-full">
      <p className="font-medium text-lg 2xl:text-2xl mb-2 2xl:mb-4">Dictionary</p>
      <img src={DictionaryImage} alt="Dictionary" className="absolute bottom-2 2xl:bottom-4 right-2 2xl:right-4 h-40 2xl:h-48 object-contain" />
    </div>
  );

  const ExoCard = () => (
    <Link to="/exo">
    <div className="relative h-full">
      <p className="font-medium text-lg 2xl:text-2xl mb-2 2xl:mb-4">Meet <span className="text-gs-dark-green">Exo</span></p>
      <img src={ExoLogo} alt="Exo logo" className="absolute pt-6 2xl:pt-8 h-20 2xl:h-24 object-contain" />
      <img src={ExoImage} alt="Exo Chat" className="absolute bottom-2 2xl:bottom-4 right-2 2xl:right-4 h-40 2xl:h-48 object-contain" />
    </div>
    </Link>
  );

  const CommunityCard = () => (
    <div className="relative h-full">
      <p className="font-medium text-lg 2xl:text-2xl mb-2 2xl:mb-4">Community</p>
      <img src={CommunityImage} alt="Community" className="absolute bottom-2 2xl:bottom-4 right-2 2xl:right-4 h-40 2xl:h-48 object-contain" />
    </div>
  );

  const MobileView = () => (
    <div className="h-screen p-4 flex flex-col font-[Poppins]">
      <div className="flex justify-between items-center w-full mb-10">
        <img
          src={gsLogoBlack}
          alt="Greenstick logo"
          className="h-12"
        />
        <div className="relative" ref={settingsButtonRef}>
          <button 
            onClick={handleSettingsClick} 
            className="text-gray-400 hover:text-black transition-colors duration-300"
            aria-label="Settings"
          >
            <FaUserGear size={24} />
          </button>
          {settingsOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white border rounded-md z-50 overflow-hidden" ref={settingsMenuRef}>
              <div>
                <button
                  onClick={handleManageSubscription}
                  className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors duration-200"
                >
                  <FaCreditCard className="mr-3 text-black" />
                  <span>Manage Payment</span>
                </button>
                <button
                  onClick={handleChangePassword}
                  className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors duration-200"
                >
                  <FaKey className="mr-3 text-black" />
                  <span>Change Password</span>
                </button>
                <button
                  onClick={onLogout}
                  className="flex items-center w-full text-left px-4 py-2 hover:bg-red-100 transition-colors duration-200"
                >
                  <FaArrowRightToBracket className="mr-3 text-black" />
                  <span>Log out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="text-center">
        <h1 className="text-2xl font-semibold mb-4">Mobile Access Unavailable</h1>
        <p className="text-lg">
          We apologize, but our app is not currently supported on mobile devices.
        </p>
        <p className="text-lg mt-2">
          Please switch to a desktop computer for the best experience.
        </p>
      </div>
    </div>
  );

  return (
    <>
      <Helmet>
        <title>Dashboard - Greenstick</title>
      </Helmet>
      <style>
        {`
          @keyframes shake {
            0% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            50% { transform: translateX(5px); }
            75% { transform: translateX(-5px); }
            100% { transform: translateX(0); }
          }
          .animate-shake {
            animation: shake 0.5s ease-in-out;
          }
        `}
      </style>
      {/* Mobile View */}
      <div className="lg:hidden">
        <MobileView />
      </div>
      {/* Desktop View */}
      <div className="hidden lg:flex h-screen bg-white overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 2xl:w-72 bg-[#edf6f0] p-6 2xl:p-8 flex flex-col">
          <img
            src={gsLogoBlack}
            alt="Greenstick logo"
            className="h-24 2xl:h-28 mb-6 2xl:mb-8 cursor-pointer"
            onClick={() => navigate("/")}
          />
          <div className="text-center mb-6 2xl:mb-8">
            <button className="bg-[#bbe6c9] text-black font-medium py-2 2xl:py-3 px-8 2xl:px-10 rounded-md text-base 2xl:text-xl">
              Level 1
            </button>
          </div>
          <div className="mb-2 2xl:mb-4">
            <p className="text-center font-semibold mb-2 text-base 2xl:text-xl">{currentUser?.plan || "No Plan"}</p>
            <p className="text-center text-sm 2xl:text-base text-gray-500">
              <a href="/pricing" className="hover:underline">
                View Pricing Options
              </a>
            </p>
          </div>
          <hr className="border-gray-300 mb-6 mt-6 2xl:mb-8 2xl:mt-8" />
          <nav className="flex-grow overflow-y-auto scrollbar-thin scrollbar-thumb-gs-light-green scrollbar-track-transparent">
            <ul className="space-y-4 2xl:space-y-6 text-base 2xl:text-lg">
              <li className="pl-4 font-bold">Levels</li>
              <li className="pl-4">The Basics</li>
              <li className="pl-8">The Principles</li>
              <li className="pl-8">The Pulse</li>
              <li className="pl-8">The Practicals</li>
              <li className="text-gray-400 pl-4">Useful Tools</li>
              <li className="text-gray-400 pl-4">Mentality</li>
              <li className="text-gray-400 pl-4">Options</li>
              <li className="text-gray-400 pl-4">Advanced Options</li>
              <li className="text-gray-400 pl-4">Futures</li>
            </ul>
          </nav>
          <hr className="border-gray-300 mb-6 2xl:mb-8" />
          <div className="mx-auto text-center">
            <button 
              className="text-black hover:text-gs-dark-green transition-colors duration-300 flex items-center justify-center text-base 2xl:text-lg" 
              onClick={() => window.location.href = "mailto:support@greenstickusa.com"}
            >
              <FaEnvelope className="mr-2 2xl:mr-3" />
              Contact Us
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-grow pt-10 2xl:pt-12 p-10 2xl:p-12 flex flex-col overflow-y-auto">
          <div className="flex justify-between items-center mb-6 2xl:mb-10">
            <h1 
              ref={greetingRef} 
              className="text-4xl sm:text-3xl md:text-5xl 2xl:text-6xl font-[Poppins]"
            >
              Welcome, <span className="font-semibold">{currentUser?.full_name}</span>
            </h1>
            <div className="relative" ref={settingsButtonRef}>
              <button 
                onClick={handleSettingsClick} 
                className="text-gray-400 hover:text-black transition-colors duration-300"
                aria-label="Settings"
              >
                <FaUserGear size={30} className="2xl:w-9 2xl:h-9" />
              </button>
              {settingsOpen && (
                <div className="absolute right-0 mt-2 w-56 2xl:w-64 bg-white border rounded-md z-50 " ref={settingsMenuRef}>
                  <div>
                    <button
                      onClick={handleManageSubscription}
                      className="flex items-center w-full text-left px-4 2xl:px-5 py-2 2xl:py-3 hover:bg-gray-100 transition-colors duration-200 text-base 2xl:text-lg"
                    >
                      <FaCreditCard className="mr-3 2xl:mr-4 text-black" />
                      <span>Manage Payment</span>
                    </button>
                    <button
                      onClick={handleChangePassword}
                      className="flex items-center w-full text-left px-4 2xl:px-5 py-2 2xl:py-3 hover:bg-gray-100 transition-colors duration-200 text-base 2xl:text-lg"
                    >
                      <FaKey className="mr-3 2xl:mr-4 text-black" />
                      <span>Change Password</span>
                    </button>
                    <button
                      onClick={onLogout}
                      className="flex items-center w-full text-left px-4 2xl:px-5 py-2 2xl:py-3 hover:bg-red-100 transition-colors duration-200 text-base 2xl:text-lg"
                    >
                      <FaArrowRightToBracket className="mr-3 2xl:mr-4 text-black" />
                      <span>Log out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 2xl:gap-10 font-[Poppins]">
        <DashboardCard 
          title="Explore the stock market" 
          content={<LearningCard />} 
          requiredPlan="Standard"
        />
        <DashboardCard 
          title="Want clarity?" 
          content={<DictionaryCard />} 
          isAlwaysLocked={true}
        />
        <DashboardCard 
          title="Have questions?" 
          content={<ExoCard />} 
          requiredPlan="Pro"
        />
        <DashboardCard 
          title="Share updates?" 
          content={<CommunityCard />} 
          isAlwaysLocked={true}
        />
      </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
