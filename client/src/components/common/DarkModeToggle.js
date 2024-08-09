import React, { useRef } from "react";
import Lottie from "react-lottie";
import dayNightAnimation from "../../assets/animations/daynightswitch.json";

const DarkModeToggle = ({ isDarkMode, setIsDarkMode }) => {
  const lottieRef = useRef(null);
  const animationHasPlayed = useRef(false);

  const toggleDarkMode = () => {
    if (lottieRef.current) {
      if (isDarkMode) {
        lottieRef.current.anim.playSegments([140, 163], true);
      } else {
        lottieRef.current.anim.playSegments([50, 75], true);
      }
      animationHasPlayed.current = true;
    }
    setIsDarkMode(!isDarkMode);
  };

  const lottieOptions = {
    loop: false,
    autoplay: false,
    animationData: dayNightAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <button onClick={toggleDarkMode}>
      <Lottie
        ref={lottieRef}
        options={lottieOptions}
        height={50}
        width={100}
        isClickToPauseDisabled={true}
      />
    </button>
  );
};

export default DarkModeToggle;
