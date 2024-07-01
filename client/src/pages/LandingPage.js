import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";
import gsLogoBlack from "../assets/images/logo-black.svg";
import preview from "../assets/images/dash-left-only.svg";
import Typed from "typed.js";
import emailIcon from "../assets/images/email-icon.svg";
import "../assets/styles/customStyles.css";
import Testimonials from "../components/Testimonials";
import ExoPreview from "../assets/images/exopreview.svg";
import CandleSticks from "../assets/animations/candlesticks.json";
import Lottie from "react-lottie";
import wallet from "../assets/images/apple-wallet.svg";
import candlestick from "../assets/images/candlestick-chart.svg";
import data from "../assets/images/database-check.svg";
import learning from "../assets/images/learning.svg";
import network from "../assets/images/server-connection.svg";
import personalized from "../assets/images/user-badge-check.svg";
import FAQSection from "../components/FAQSection";
import XPAnimation from "../assets/animations/XP.json";
import MindsetAnimation from "../assets/animations/Mindset.json";
import CountdownTimer from "../components/CountdownTimer";
import Footer from "../components/common/Footer";

const LandingPage = () => {
  const svgRef = useRef(null);
  const contentRef = useRef(null);
  const navigate = useNavigate();
  const [animationComplete, setAnimationComplete] = useState(false);
  const el = useRef(null);
  const [showRegisterInNav, setShowRegisterInNav] = useState(false);
  const registerButtonRef = useRef(null);
  const [email, setEmail] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleRegister = () => {
    navigate("/register", { state: { email }});
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (registerButtonRef.current) {
        const rect = registerButtonRef.current.getBoundingClientRect();
        setShowRegisterInNav(rect.bottom <= 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const options = {
      strings: ["trading", "crypto", "stocks", "options", "futures"],
      typeSpeed: 50,
      backSpeed: 50,
      loop: true,
      backDelay: 2500,
      showCursor: true,
      cursorChar: "|",
    };

    const typed = new Typed(el.current, options);
    return () => typed.destroy();
  }, []);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: CandleSticks, 
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    const hasVisitedBefore = localStorage.getItem("hasVisitedBefore");

    if (!hasVisitedBefore) {
      document.body.style.overflow = "hidden"; 

      gsap.set(contentRef.current, { autoAlpha: 0 });

      const tl = gsap.timeline({
        defaults: { ease: "power1.out" },
        onComplete: () => {
          setAnimationComplete(true);
          document.body.style.overflow = "auto"; 
          localStorage.setItem("hasVisitedBefore", "true");
        },
      });

      const paths = svgRef.current.querySelectorAll("path");

      const sortedPaths = Array.from(paths).sort((a, b) => {
        return a.getBBox().x - b.getBBox().x;
      });

      sortedPaths.forEach((path) => {
        const length = path.getTotalLength();
        path.style.strokeDasharray = length;
        path.style.strokeDashoffset = length;

        tl.to(
          path,
          {
            strokeDashoffset: 0,
            duration: 0.75,
          },
          "-=0.8"
        ).to(path, {
          fill: "#000000",
          duration: 0.25,
          ease: "power2.inOut",
        });
      });
      tl.add(() => {
        paths.forEach((path) => {
          if (!path.id || path.id !== "black") {
            gsap.to(path, {
              fill: "#40ac70",
              stroke: "#40ac70",
              duration: 1,
              ease: "power2.inOut",
            });
          }
        });
      });
      tl.to(svgRef.current, {
        duration: 2,
        onComplete: () => {
          gsap.to(svgRef.current, {
            autoAlpha: 0,
            duration: 1,
            onComplete: () => {
              setAnimationComplete(true);
              gsap.fromTo(
                contentRef.current,
                { autoAlpha: 0 },
                { autoAlpha: 1, duration: 1 }
              );
            },
          });
        },
      });

      return () => tl.kill();
    } else {
      setAnimationComplete(true);
    }
  }, [navigate]);

  return (
    <div className="relative min-h-screen bg-white">
      {!animationComplete && (
        <div className="flex flex-col items-center justify-center h-screen">
          <svg
            id="logo-black-svg"
            version="1.1"
            viewBox="0.0 0.0 960.0 720.0"
            fill="none"
            stroke="none"
            strokeLinecap="square"
            strokeMiterlimit="10"
            ref={svgRef}
            className="w-1/2 sm:w-1/3 md:w-1/4 lg:-1/6"
          >
            <clipPath id="p.0">
              <path
                stroke="#000000"
                strokeWidth="2"
                d="m0 0l960.0 0l0 720.0l-960.0 0l0 -720.0z"
              />
            </clipPath>
            <g clipPath="url(#p.0)">
              <path stroke="#000000" d="m192.0 168.0l144.0 0l0 96.0l-144.0 0z" />
              <path stroke="#000000" d="m288.0 168.0l0 288.0l-96.0 0l0 -288.0z" />
              <path
                stroke="#000000"
                d="m291.6 459.6l192.0 0l0 95.99997l-192.0 0z"
              />
              <path
                stroke="#000000"
                d="m483.6 459.6l0 -144.0l95.99997 0l0 144.0z"
              />
              <path
                id="black"
                stroke="#000000"
                d="m579.6 171.6l192.0 0l0 96.0l-192.0 0z"
              />
              <path
                stroke="#000000"
                d="m335.99948 264.00052l0 -96.0l96.0 96.0z"
              />
              <path stroke="#000000" d="m483.5995 459.5995l96.0 0l-96.0 96.0z" />
              <path
                stroke="#000000"
                d="m483.60074 315.60104l95.99997 0l0 96.0l-95.99997 0z"
              />
              <path
                id="black"
                stroke="#000000"
                d="m579.6005 267.60052l-96.0 0l96.0 -96.0z"
              />
              <path
                id="black"
                stroke="#000000"
                d="m483.6 267.6l95.99997 0l0 43.212585l-95.99997 0z"
              />
              <path
                stroke="#000000"
                d="m191.99948 455.99948l96.0 0l-96.0 95.99997z"
              />
              <path
                stroke="#000000"
                d="m291.60052 555.6005l-96.0 0l96.0 -96.0z"
              />
              <path
                stroke="#000000"
                d="m483.60104 364.8294l0 -49.228363l-48.0 49.228363z"
              />
            </g>
          </svg>
        </div>
      )}
      <div ref={contentRef} className={`absolute left-0 top-0 w-full ${animationComplete ? "opacity-100" : "opacity-0"}`}>
        <div className="fixed top-0 left-0 w-full z-50 px-4 py-2 sm:py-3 bg-white border-y">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <img
              src={gsLogoBlack}
              alt="Greenstick logo"
              className="h-8 sm:h-10 md:h-12 cursor-pointer"
              onClick={() => navigate("/")}
            />
            <div className="flex items-center space-x-2 sm:space-x-4">
              {showRegisterInNav && (
                <button
                  className="bg-black border-2 border-black text-white font-bold py-1 px-2 sm:px-3 sm:py-2 rounded-md hover:text-black hover:bg-white transition-colors duration-300"
                  onClick={() => navigate("/register")}
                >
                  Register
                </button>
              )}
              <button
                className="border-2 border-black text-black font-bold bg-white py-1 px-2 sm:px-3 sm:py-2 rounded-md font-[Poppins] hover:text-white hover:bg-black transition-colors duration-300"
                onClick={() => navigate("/login")}
              >
                Log in
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row justify-between items-center pt-32 md:pt-36 lg:pt-44 px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-7xl mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center justify-between text-center lg:text-left">
              <div className="max-w-full">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-[Poppins] font-medium mt-12 lg:mt-0">
                  Introducing <span className="text-gs-dark-green">Green</span>stick
                </h1>
                <h2 className="mt-4 sm:mt-8 text-lg sm:text-xl md:text-2xl font-[Poppins] font-light">
                  Building the best way to learn{" "}
                  <span ref={el} className="text-gs-dark-green font-medium"></span>
                </h2>
                <div className="relative mt-4 sm:mt-8 lg:w-10/12 xl:w-11/12" id="searchBar">
                <input
    type="email"
    placeholder="Your email address"
    className="pl-10 pr-8 py-3 sm:py-4 border-2 border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-gs-dark-green focus:border-gs-dark-green"
    style={{
      backgroundImage: `url(${emailIcon})`,
      backgroundPosition: "12px center",
      backgroundSize: "20px 20px",
      backgroundRepeat: "no-repeat",
    }}
    value={email}
    onChange={handleEmailChange}
  />
  <button
    ref={registerButtonRef}
    onClick={handleRegister}
    className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 bg-black border-2 border-black text-white font-bold py-2 px-4 rounded-md hover:text-black hover:bg-white transition-colors duration-300"
  >
    Register
  </button>
                </div>
              </div>
              <div className="mt-8 lg:mt-0 lg:ml-10 order-first lg:order-last">
                <img
                  src={preview}
                  alt="Dashboard Preview"
                  className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl mx-auto"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="relative bg-white py-12">
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gs-light-green"></div>
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl p-8 mb-8">
              <div className="flex flex-col lg:flex-row items-center justify-between">
                <div className="text-left lg:w-1/2 pr-8">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-[Poppins] font-medium">
                    An all-in-one solution.
                  </h3>
                  <p className="mt-4 sm:mt-6 text-lg sm:text-xl md:text-2xl font-[Poppins] font-light">
                  From interactive lessons to practical trading simulations and more, Greenstick equips you with everything you’ll need to succeed on the stock market. 
                  </p>
                  <button 
                    onClick={() => navigate("/register")}
                    className="mt-8 bg-gs-light-green border-2 border-gs-light-green text-black font-bold py-2 px-4 rounded-md hover:text-black hover:bg-gs-dark-green hover:border-gs-dark-green transition-colors duration-300"
                  >
                    Get started
                  </button>
                </div>
                <div className="mt-8 lg:mt-0 lg:w-1/2">
                  <Lottie isClickToPauseDisabled={true} options={defaultOptions} height={400} width={400} />
                </div>
              </div>
            </div>
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="pt-8 pb-8 text-black">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-center">
                <div className="flex flex-col items-center">
                  <img src={data} alt="Paper Money Trading" className="h-12 mb-2" />
                  <div className="font-[Poppins]">Paper Money Trading</div>
                </div>
                <div className="flex flex-col items-center">
                  <img src={personalized} alt="Personalized Feedback" className="h-12 mb-2" />
                  <div className="font-[Poppins]">Personalized Feedback</div>
                </div>
                <div className="flex flex-col items-center">
                  <img src={candlestick} alt="Market Insights" className="h-12 mb-2" />
                  <div className="font-[Poppins]">Market Insights</div>
                </div>
                <div className="flex flex-col items-center">
                  <img src={wallet} alt="Structured Lessons" className="h-12 mb-2" />
                  <div className="font-[Poppins]">Structured Lessons</div>
                </div>
                <div className="flex flex-col items-center">
                  <img src={network} alt="AI-Powered Strategies" className="h-12 mb-2" />
                  <div className="font-[Poppins]">AI-Powered Strategies</div>
                </div>
                <div className="flex flex-col items-center">
                  <img src={learning} alt="All skill levels" className="h-12 mb-2" />
                  <div className="font-[Poppins]">All Skill Levels</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative bg-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center justify-between">
              <div className="lg:w-1/2 pr-8">
                <h2 className="text-4xl sm:text-5xl font-[Poppins] text-gray-900 mb-4">
                  Build the trader mindset.
                </h2>
                <p className="text-lg sm:text-xl font-[Poppins] text-gray-600 mb-4">
                  At its core, Greenstick focuses the most on equipping its users with the psychological tools necessary for stock market success.
                </p>
                <p className="text-lg sm:text-xl font-[Poppins] text-gray-600">
                  Learn how to compartmentalize your emotions and stay disciplined through stressful trades, ensuring your losses are minimized and your profits remain high.
                </p>
              </div>
              <div className="lg:w-1/2 mt-8 lg:mt-0">
                <div className="rounded-lg p-6">
                  <Lottie isClickToPauseDisabled={true} options={{
                    loop: true,
                    autoplay: true,
                    animationData: MindsetAnimation,
                    rendererSettings: {
                      preserveAspectRatio: "xMidYMid slice",
                    },
                  }} 
                  height={400} 
                  width={400} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center justify-between">
              <div className="lg:w-1/2 flex justify-center items-center">
                <div className="w-full max-w-sm">
                  <Lottie 
                    isClickToPauseDisabled={true} 
                    options={{
                      loop: true,
                      autoplay: true,
                      animationData: XPAnimation,
                      rendererSettings: {
                        preserveAspectRatio: "xMidYMid slice",
                        pointerEvents: "none",
                      },
                    }} 
                    height={300} 
                    width={300} 
                  />
                </div>
              </div>
              <div className="lg:w-1/2 pr-8">
                <h2 className="text-4xl sm:text-5xl font-[Poppins] text-gray-900 mb-4">
                  Stay motivated.
                </h2>
                <p className="text-lg sm:text-xl font-[Poppins] text-gray-600 mb-4">
                  We strive to make the learning process as entertaining as possible. Gain XP points as you progress through levels and make successful trades. Unlock new themes, earn badges for achievements, and even get discounts on premium plans.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="relative py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-[Poppins] font-medium">
                Confused? Meet Exo.
              </h2>
            </div>
            <div className="mt-12">
              <img
                src={ExoPreview}
                alt="Exo Preview"
                className="mx-auto max-w-full h-auto"
              />
            </div>
            <div className="mt-12 grid grid-cols-2 gap-8 md:grid-cols-3">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-[Poppins] font-medium text-gray-900">Instant Trade Analysis</h3>
                <p className="mt-2 text-base text-gs-dark-gray">Exo instantly analyzes your trades, providing actionable insights and suggestions to optimize your strategies.</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-[Poppins] font-medium text-gray-900">Screenshot & File Analysis</h3>
                <p className="mt-2 text-base text-gs-dark-gray">Upload screenshots or files and let Exo break down complex data, giving you a clear path to improvement.</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-[Poppins] font-medium text-gray-900">Seamless Integration</h3>
                <p className="mt-2 text-base text-gs-dark-gray">Exo is fully integrated with Greenstick, tracking your progress and providing context-aware support tailored to your learning journey.</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-[Poppins] font-medium text-gray-900">Advanced Statistics</h3>
                <p className="mt-2 text-base text-gs-dark-gray">Dive deep into your trading stats with Exo's advanced analytics, designed to help you understand and improve your performance.</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-[Poppins] font-medium text-gray-900">Next-Level Interactivity</h3>
                <p className="mt-2 text-base text-gs-dark-gray">Questions? Comments? Concerns? Exo will always be right beside you, ready to explain anything you want to learn.
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-[Poppins] font-medium text-gray-900">Context-Aware Feedback</h3>
                <p className="mt-2 text-base text-gs-dark-gray">Exo provides personalized feedback based on your activity within Greenstick, ensuring you always receive relevant and actionable advice.</p>
              </div>
            </div>
          </div>
        </div>
        <Testimonials /> 
        <FAQSection />
        <CountdownTimer />
        <Footer/>
      </div>
    </div>
  );
};

export default LandingPage;
