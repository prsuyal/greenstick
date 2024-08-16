import React, { useRef, useEffect } from "react";
import Lottie from "react-lottie";
import dayNightAnimation from "../../assets/animations/daynightswitch.json";

const DarkModeToggle = ({ isDarkMode, setIsDarkMode }) => {
  const lottieRef = useRef(null);
  const hasInteracted = useRef(false);

  useEffect(() => {
    if (lottieRef.current) {
      lottieRef.current.anim.goToAndStop(isDarkMode ? 75 : 163, true);
    }
  }, []);

  const toggleDarkMode = () => {
    if (lottieRef.current) {
      hasInteracted.current = true;
      if (isDarkMode) {
        lottieRef.current.anim.playSegments([140, 163], true);
      } else {
        lottieRef.current.anim.playSegments([50, 75], true);
      }
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
        eventListeners={[
          {
            eventName: 'complete',
            callback: () => {
              if (!hasInteracted.current) {
                // If animation completes without user interaction, reset to static frame
                lottieRef.current.anim.goToAndStop(isDarkMode ? 75 : 163, true);
              }
            },
          },
        ]}
      />
    </button>
  );
};

export default DarkModeToggle;