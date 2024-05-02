import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const svgRef = useRef(null);
  const navigate = useNavigate();
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
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
            onComplete: () => navigate("/register"),
          });
        },
      });
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
    </>
  );
};

export default LandingPage;
