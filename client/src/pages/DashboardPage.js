import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import gsap from "gsap";
import gsLogoBlack from "../assets/images/logo-black.svg";
import { Helmet } from 'react-helmet';
import { FaUserGear, FaCreditCard, FaKey, FaArrowRightToBracket } from "react-icons/fa6";

const DashboardPage = ({ user, onLogout }) => {
  const [currentUser, setCurrentUser] = useState(user);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const navigate = useNavigate();
  const greetingRef = useRef(null);
  const settingsRef = useRef(null);

  useEffect(() => {
    const timeline = gsap.timeline({ defaults: { ease: "back.out(1.7)" } });

    timeline
      .fromTo(greetingRef.current, { opacity: 0, y: -50 }, { opacity: 1, y: 0, duration: 0.7 });

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
      const response = await fetch('http://localhost:3001/api/stripe/create-customer-portal-session', {
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
      <div className="min-h-screen bg-white flex">
        <div className="fixed top-0 left-0 w-64 h-full z-50 px-4 py-2 sm:py-3 bg-white border-r">
          <div className="flex flex-col items-center">
            <img
              src={gsLogoBlack}
              alt="Greenstick logo"
              className="h-16 sm:h-20 md:h-24 cursor-pointer mb-8"
              onClick={() => navigate("/")}
            />
            <div className="w-full">
              <div className="block text-lg py-2 px-4 mb-2 transition-colors duration-300 hover:bg-gray-200 rounded-md cursor-pointer"
                onClick={() => navigate('/level-1')}>
                Level 1
              </div>
              <div className="text-gray-400 cursor-not-allowed">Level 2</div>
              <div className="text-gray-400 cursor-not-allowed">Level 3</div>
              <div className="text-gray-400 cursor-not-allowed">Level 4</div>
              <div className="text-gray-400 cursor-not-allowed">Level 5</div>
              <div className="text-gray-400 cursor-not-allowed">Level 6</div>
              <div className="text-gray-400 cursor-not-allowed">Level 7</div>
              <div className="text-gray-400 cursor-not-allowed">Level 8</div>
            </div>
          </div>
        </div>

        <div className="flex-grow pt-32 md:pt-36 lg:pt-44 pl-64 flex flex-col items-center justify-center px-4">
          <div className="fixed top-0 left-64 w-full z-50 px-4 py-2 sm:py-3 bg-white border-b">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
              <h1 
                ref={greetingRef} 
                className="text-2xl sm:text-3xl md:text-4xl font-[Poppins] font-medium"
              >
                Hello, {currentUser.full_name}!
              </h1>
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

          <div className="bg-gray-100 rounded-lg p-6 text-center mt-12">
            <h2 className="text-4xl font-[Poppins] font-light mb-2">Explore Level 1</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {level1Contents.map((item, index) => (
                <Link
                  key={index}
                  to={item.route}
                  className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow duration-300"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
