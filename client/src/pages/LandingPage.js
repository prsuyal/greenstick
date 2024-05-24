import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";
import gsLogoBlack from "../assets/images/logo-black.svg";
import preview from "../assets/images/dash-left-only.svg";
import Typed from "typed.js";
import emailIcon from "../assets/images/email-icon.svg";
import "../assets/styles/customStyles.css";
import macbook from "../assets/images/macbook-pro.svg"

const LandingPage = () => {
  const svgRef = useRef(null);
  const contentRef = useRef(null);
  const navigate = useNavigate();
  const [animationComplete, setAnimationComplete] = useState(false);
  const el = useRef(null);
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
/*
  useEffect(() => {
    gsap.set(contentRef.current, { autoAlpha: 0 });

    const tl = gsap.timeline({
      defaults: { ease: "power1.out" },
      onComplete: () => setAnimationComplete(true),
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
  }, [navigate]);
  */
  return (
    <>
      
      <div ref={contentRef} className="absolute top-0 left-0 w-full h-screen">
        <div className="fixed top-0 left-0 w-full z-10 bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <img src={gsLogoBlack} alt="Greenstick logo" className="h-14" />
            <button
              className="border-2 border-black text-black font-bold bg-white py-2 px-4 rounded-md font-[Poppins] hover:text-white hover:bg-black transition-colors duration-300"
              onClick={() => navigate("/login")}
            >
              Log in
            </button>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row justify-between items-center min-h-screen">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="flex flex-col lg:flex-row items-center justify-between">
              <div>
                <h1 className="text-4xl sm:text-8xl font-[Poppins] font-medium">
                  Introducing <span className="text-gs-dark-green">Green</span>
                  stick
                </h1>
                <h2 className="mt-10 text-xl sm:text-2xl font-[Poppins] font-light">
                  Building the best way to learn{" "}
                  <span ref={el} className="text-gs-dark-green font-medium"></span>
                </h2>
                <div className="relative mt-10">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="pl-12 pr-8 py-4 border-2 border-gray-300 rounded-lg w-9/12"
                    style={{
                      backgroundImage: `url(${emailIcon})`,
                      backgroundPosition: "12px center",
                      backgroundSize: "20px 20px",
                      backgroundRepeat: "no-repeat",
                    }}
                  />
                  <button
                    onClick={() => navigate("/register")}
                    className="absolute right-44 top-1/2 transform -translate-y-1/2 bg-black border-2 border-black text-white font-bold py-2 px-4 rounded-md hover:text-black hover:bg-white transition-colors duration-300"
                  >
                    Register
                  </button>
                </div>
                <p className="text-sm mt-2">
                  Or,{" "}
                  <a
                    href="#"
                    className="text-black font-bold hover:underline"
                    onClick={() => navigate("/register")}
                  >
                    click here
                  </a>{" "}
                  to sign up with Google or Apple.
                </p>
              </div>
              <div>
                <img
                  src={preview}
                  alt="Dashboard Preview"
                  className="max-w-xl h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
