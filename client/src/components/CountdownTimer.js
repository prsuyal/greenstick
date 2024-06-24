import React, { useState, useEffect } from 'react';

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date('2024-08-01T00:00:00').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });

      if (difference < 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const padNumber = (num) => String(num).padStart(2, '0');

  return (
    <div className="bg-gs-light-green py-8 sm:py-12">
      <div className="max-w-3xl mx-auto px-4">
        <div className="flex items-center justify-center mb-4 sm:mb-6">
          <h2 className="text-black text-2xl sm:text-4xl font-[Poppins]">Coming soon...</h2>
        </div>
        <div className="flex flex-wrap justify-between text-black font-[Poppins]">
          {['days', 'hours', 'minutes', 'seconds'].map((unit) => (
            <div key={unit} className="w-1/2 sm:w-1/4 text-center mb-4 sm:mb-0">
              <div className="inline-block bg-white bg-opacity-30 rounded-lg p-2 sm:p-3">
                <div 
                  className="text-3xl sm:text-5xl md:text-6xl font-mono"
                  style={{ fontVariantNumeric: 'tabular-nums' }}
                >
                  {padNumber(timeLeft[unit])}
                </div>
              </div>
              <div className="text-xs mt-1 sm:mt-2">{unit.toUpperCase()}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;