import React, { useState } from 'react';
import ModuleTemplate from '../../../../components/common/ModuleTemplate';
import Tooltip from '../../../../components/common/Tooltip';
import { SymbolInfo } from 'react-ts-tradingview-widgets';
import { motion } from 'framer-motion';

const SubLevelALesson2 = ({ user }) => {
  const [step, setStep] = useState(0);

  const handleNext = () => {
    if (step < content.length - 1) {
      setStep(step + 1);
    }
  };

  const handlePrevious = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  if (!user) {
    return <div>Loading...</div>; // Render a loading state while fetching user data
  }

  const handleStepChange = (newStep) => {
    setStep(newStep);
  };

  const content = [
    <>
      <p>
        Now that we have the basics down, let's take the time to dive deeper into the stock market.
      </p>
    </>,
    <>
      <p>
        If you've ever talked to someone who knows the stock market, you might've heard them say, "The market's up 2% today!" before and wondered what they meant. How could the "market" be up or down? Isn't it individual stocks that change in value, not the stock market as a whole?
      </p>
    </>,
    <>
      <p>
        Well, you're both right and wrong. It is individual stock movements that drive the growth or decline of the stock market, but there are specific entities dedicated to depicting the overall market. These entities are called <Tooltip term="indices" definition="Statistical measures of change in a securities market" />.
      </p>
    </>,
    <>
      <p>
        Let's take a look at a few famous indices, starting with the <Tooltip term="S&P 500" definition="An index of 500 of the largest publicly traded companies in the U.S." />.
      </p>
      <div className="my-4">
        <SymbolInfo symbol="SPY" />
      </div>
      <p>
        This is the ticker for the S&P 500.
      </p>
    </>,
    <>
      <p>
        The S&P 500 is an index composed of 500 of the largest public companies in the United States, encompassing a variety of <Tooltip term="sectors" definition="Categories of companies that share similar business activities" />.
      </p>
      <p>
        Instead of dollars, indices' values are measured in <Tooltip term="points" definition="Units used to express the value of an index" />. They gain points when the stocks under them do well and lose points when they don't. The larger a company is, the greater the effect they have on the index's movements.
      </p>
    </>,
    <>
      <p>
        When anyone talks about how the "market" is doing, they're almost always talking more specifically about the S&P, as it's the best and most comprehensive tool to look at the American market as a whole.
      </p>
      <p>
        On any given day, just by looking at the S&P, you can get a feel of how most stocks are moving.
      </p>
    </>,
    <>
      <p>
        Another famous index to keep in mind is the <Tooltip term="Dow Jones Industrial Average" definition="An index of 30 prominent companies listed on stock exchanges in the United States" /> (DJI). Let's take a deeper look at it as well.
      </p>
      <div className="my-4">
        <SymbolInfo symbol="DIA" />
      </div>
    </>,
    <>
      <p>
        Unlike the S&P 500, the DJIA only takes into account 30 companies, or more specifically, the 30 most prominent American stocks across a range of sectors. It is more an indicator of how the strongest stocks in American markets are doing than of the overall market.
      </p>
      <p>
        An important note to make here is that the point values for any indices are incomparable. The best way to think about any movements is in terms of percent change rather than absolute change. This goes for almost everything on the stock market, as well.
      </p>
    </>,
    <>
      <p>
        Some other major indices include the NASDAQ, which mainly covers tech stocks, and the Russell 3000, which is another index that covers the overall American market.
      </p>
      <p>
        To get a feel for markets outside of the US, you could also track international indices, like the Nikkei 225, which covers the Japanese market, and the FTSE 100, which covers the British market.
      </p>
    </>,
    <>
      <p>
        Congratulations! You've finished the lesson.
      </p>
    </>
  ];

  return (
    <ModuleTemplate 
      title="Let's understand the market" 
      lessonId="1a2"
      levelNumber="1"
      sublevelLetter="A"
      lessonNumber="2"
      userId={user.id}
      onNext={handleNext}
      onPrevious={handlePrevious}
      totalSteps={content.length}
      currentStep={step + 1}
      nextLessonPath="/level-1/a/quiz-2"
      previousLessonPath="/level-1/a/quiz-1"
      onStepChange={handleStepChange}
    >
      {content.slice(0, step + 1).map((item, index) => (
        <motion.div 
          key={index}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {item}
        </motion.div>
      ))}
    </ModuleTemplate>
  );
};

export default SubLevelALesson2;
