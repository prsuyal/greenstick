import React, { useState } from 'react';
import ModuleTemplate from '../../../../components/common/ModuleTemplate';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import MarketMakers from '../../../../assets/animations/marketmakers.json';
import BalancedCubes from '../../../../assets/animations/5x5_Balance.json';
import Add1 from '../../../../assets/animations/Add 1 v2.json';
import Enlarge from '../../../../assets/animations/enlarge.json';
import Down from '../../../../assets/animations/Stock Market Down.json';
import { FaLightbulb } from 'react-icons/fa';
import Shrink from '../../../../assets/animations/shrink.json';
import Remove2 from '../../../../assets/animations/Remove 2.json';


const SubLevelBLesson1 = ({ user }) => {
  const [step, setStep] = useState(0);
  const [marketPrice, setMarketPrice] = useState(190.27);
  const [bidPrice, setBidPrice] = useState(190.23);
  const [askPrice, setAskPrice] = useState(190.34);
  if (!user) {
    return <div></div>; // Render a loading state while fetching user data
  }

  const handleStepChange = (newStep) => {
    setStep(newStep);
  };

  const handleNext = (newStep) => {
      if (step < content.length - 1) {
        setStep(newStep);
      }
    };
  
    const handlePrevious = (newStep) => {
      if (step > 0) {
        setStep(newStep);
      }
    };

  const handleSliderChange = (event) => {
    const newPrice = parseFloat(event.target.value);
    setMarketPrice(newPrice);
  };

  const content = [
    <>
      <div className="mb-8">
        <p className="mb-4">
          In Lesson 1A1, we mentioned that "as time passes, the value of the stock increases or decreases depending on the company's level of success, allowing the user to make (or lose) money."
        </p>
        <p>
          Well, that isn't the complete truth. Company performance is one of the main factors that drives traders to buy or sell stock, but there is no one person or group that constantly reevaluates stock prices to keep them accurate to the performance of a company.
        </p>
      </div>
    </>,
    <>
      <div className="mb-8">
        <p className="mb-4">
          Instead, just like groceries, gas, or any other thing you routinely buy, stock prices are driven by supply and demand.
        </p>
        <div className="h-64 flex items-center justify-center">
          <Lottie animationData={BalancedCubes} loop={true} />
        </div>
      </div>
    </>,
    <>
      <div className="mb-8">
        <p className="mb-4">
          Let's imagine that every cube on the left represents a trader, like you, and every cube on the right represents a share of X stock. In this scenario, there are five traders actively buying X stock and five shares of X stock in existence.
        </p>
        <div className="h-64 flex items-center justify-center">
          <Lottie animationData={Add1} loop={true} />
        </div>
      </div>
    </>,
    <div className="mb-8" key="exo-explanation">
      <p className="mb-4">
        Now, a fundamental concept of the stock market is that this scale must stay balanced, no matter what. Another important concept is that the number of shares of company stock in existence almost never changes. That is, we will never be able to add cubes to the right side of this scale to balance it.
      </p>
      <div className="bg-gray-100 p-4 rounded-lg flex items-center">
        <FaLightbulb className="w-6 h-6 mr-2 text-yellow-500" />
        <a className="text-black">
          Curious about what the exceptions to this concept are? Ask <span>Exo</span>.
        </a>
      </div>
    </div>,
    <>
      <div className="mb-8">
        <p className="mb-4">
          With this in mind, let's conduct an experiment. Imagine that today, two new traders decided to enter the market for X stock. Maybe they heard that X was going to do great things in the future. But now we have a problem. How do we rebalance the scale?
        </p>
        <div className="h-64 flex items-center justify-center">
          <Lottie animationData={BalancedCubes} loop={true} />
        </div>
      </div>
    </>,
    <>
      <div className="mb-8">
        <p className="mb-4">
          Well, if we can't add cubes to the right side, the only solution is to make the right side cubes bigger.
        </p>
        <div className="h-64 flex items-center justify-center">
          <Lottie animationData={Enlarge} loop={true} />
        </div>
      </div>
    </>,
    <>
      <div className="mb-8">
        <p className="mb-4">
          Now, let's say that tomorrow, three people decide to sell X stock.
        </p>
        <div className="h-64 flex items-center justify-center">
          <Lottie animationData={Remove2} loop={true} />
        </div>
        <p className="mt-4">
          To rebalance the scale, we can shrink the cubes on the right side.
        </p>
        <div className="h-64 flex items-center justify-center">
          <Lottie animationData={Shrink} loop={true} />
        </div>
      </div>
    </>,
    <>
      <div className="mb-8">
        <p className="mb-4">
          But what does any of this really mean? Well, when we increased the number of buyers, the price of each share increased. When we increased the number of sellers, the price of each share decreased.
        </p>
        <p>
          This is the central tenet of supply and demand. Traders represent the demand, while stock represents the supply. Increasing the demand means the value of the supply increases, and vice versa.
        </p>
      </div>
    </>,
    <>
      <div className="mb-8">
        <p>
          But if you have been paying close attention, you might have noticed that something isn't quite adding up. For every buyer of a stock, there must be a corresponding seller, right? The stock can't just appear out of nowhere, ready to be bought. Someone has to be ready to sell in order for anyone to be able to buy. Then, how can the number of cubes on the left ever really change?
        </p>
      </div>
    </>,
    <>
      <div className="mb-8">
        <p>
          If you did notice, great question! If not, no worries, because that's what we're here for. This is where the twin concepts of bid and ask prices come into play.
        </p>
      </div>
    </>,
    <>
      <div className="mb-8">
        <p className="mb-36">
          In theory, all sellers of stock put their shares up for sale at market price, and all buyers buy these shares at market price. However, while this is true for most individual traders, large-scale traders known as market makers like to make their own rules.
        </p>
        <div className="mb-24 h-64 flex items-center justify-center">
          <Lottie animationData={MarketMakers} loop={true} />
        </div>
      </div>
    </>,
    <>
      <div className="bg-gray-200 p-6 rounded-lg mb-8">
        <p className="mb-4 text-lg">Now let's imagine you're a market maker. Pick a point to sell your shares!</p>
        <input
          type="range"
          min={bidPrice}
          max={askPrice}
          step="0.01"
          value={marketPrice}
          onChange={handleSliderChange}
          className="slider w-full mb-4"
        />
        <div className="text-center flex justify-between items-center mb-4">
          <div className="text-green-500 bg-gray-100 p-4 rounded-lg">
            <p className="text-2xl font-light">${bidPrice}</p>
            <p>Bid</p>
          </div>
          <div className="text-center text-black bg-gray-300 p-4 rounded-lg">
          <p className="text-2xl font-bold">${marketPrice.toFixed(2)}</p>
            <p>Market Price</p>
          </div>
          <div className="text-center text-red-500 bg-gray-100 p-4 rounded-lg">
            <p className="text-2xl font-light">${askPrice}</p>
            <p>Ask</p>
          </div>
        </div>
        <div className="mb-4">
        <p className="mb-4">
          Because so many shares have now been sold at this price, the new market price that every day trader will see is ${marketPrice.toFixed(2)}.
        </p>
      </div>
      </div>
    </>,
    <>
      <div className="mb-8">
        <p>
          Coming back to our supply and demand model, the ask is usually favored when there are many buyers in the market.
        </p>
      </div>
    </>,
    <>
      <div className="mb-8">
        <p className="mb-4">
          On the other hand, if the sale-point ends up below the market price, favoring the bid, the market price will shift slightly downward to represent this.
        </p>
        <div className="h-64 flex items-center justify-center">
          <Lottie animationData={Down} loop={true} />
        </div>
      </div>
    </>,
    <>
      <div className="mb-8">
        <p>
          In terms of supply and demand, the bid is usually favored when there are many sellers in the market.
        </p>
      </div>
    </>,
    <>
      <div className="mb-8">
        <p>
          It is important to note that the only reason the market price changes with these orders is because of their size. If you, for example, were to set an ask price of $190.50 for your 5 shares of stock and it was met, the market price would not change, since the sale of 5 shares is meaningless in the grand scheme of the stock market.
        </p>
      </div>
    </>,
    <>
      <div className="mb-8">
        <p>
          However, market makers trade with thousands or even millions of shares, which is how they have the power to shape, or "make," the market.
        </p>
      </div>
    </>,
    <>
      <div className="mb-8">
        <p>
          Congratulations! You've finished the lesson.
        </p>
      </div>
    </>,
  ];

  return (
    <ModuleTemplate 
      title="Breaking down stock prices" 
      lessonId="1b1"
    userId={user.id}
      onNext={handleNext}
      onPrevious={handlePrevious}
      totalSteps={content.length}
      currentStep={step + 1}
      nextLessonPath="/level-1/b/quiz-1"
      previousLessonPath="/level-1/a/quiz-2"
      onStepChange={handleStepChange}
    >
      {content.slice(0, step + 1).map((item, index) => (
        <motion.div 
          key={index}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="p-4"
        >
          {item}
        </motion.div>
      ))}
    </ModuleTemplate>
  );
};

export default SubLevelBLesson1;