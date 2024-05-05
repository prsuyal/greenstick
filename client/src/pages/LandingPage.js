import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";
import gsLogoBlack from "../assets/images/logo-black.svg";
import preview from "../assets/images/dash-left-only.svg";
import Typed from "typed.js";
import emailIcon from "../assets/images/email-icon.svg";
import "../assets/styles/customStyles.css";

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
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <svg
          id="logo-black-svg"
          version="1.1"
          viewBox="0.0 0.0 960.0 720.0"
          fill="none"
          stroke="none"
          stroke-linecap="square"
          stroke-miterlimit="10"
          ref={svgRef}
        >
          <clipPath id="p.0">
            <path
              stroke="#000000"
              stroke-width="2"
              d="m0 0l960.0 0l0 720.0l-960.0 0l0 -720.0z"
            />
          </clipPath>
          <g clip-path="url(#p.0)">
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
        </svg>{" "}
      </div>
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
        <div className="pt-24 flex flex-col lg:flex-row justify-between items-center min-h-screen">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="flex flex-col lg:flex-row items-center justify-between">
              <div>
                <h1 className="text-4xl sm:text-5xl font-[Poppins] font-bold">
                  Introducing <span className="text-gs-dark-green">Green</span>
                  stick
                </h1>
                <h2 className="mt-10 text-xl sm:text-2xl font-[Poppins] font-light">
                  Building the best way to learn{" "}
                  <span ref={el} className="text-gs-dark-green"></span>
                </h2>
                <div className="relative mt-10">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="pl-12 pr-20 py-4 border-2 border-gray-300 rounded-lg w-full"
                    style={{
                      backgroundImage: `url(${emailIcon})`,
                      backgroundPosition: "12px center",
                      backgroundSize: "20px 20px",
                      backgroundRepeat: "no-repeat",
                    }}
                  />
                  <button
                    onClick={() => navigate("/register")}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black border-2 border-black text-white font-bold py-2 px-4 rounded-md hover:text-black hover:bg-white transition-colors duration-300"
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
                  className="max-w-full h-auto"
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
