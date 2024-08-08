import React, { useState } from 'react';
import ModuleTemplate from '../../../../components/common/ModuleTemplate';
import Tooltip from '../../../../components/common/Tooltip';
import { FundamentalData } from "react-ts-tradingview-widgets";
import Lottie from 'react-lottie';
import House from '../../../../assets/animations/House.json';

const SubLevelCLesson2 = ({ user }) => {
  const [step, setStep] = useState(0);

  if (!user) {
    return <div></div>; // Render a loading state while fetching user data
  }
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

  const handleStepChange = (newStep) => {
    setStep(newStep);
  };

  const FundamentalDataWidget = ({ symbol }) => (
    <FundamentalData
      symbol={symbol}
      colorTheme="light"
      width="100%"
      height={400}
    />
  );

  const content = [
    <>
      <p>In the past, we've talked about and gone through the process of executing market orders—orders placed at market price. But these aren't the only orders out there. In fact, there are a variety of order types you can use as tools to help you trade more effectively.</p>
      <p>Imagine you're in the market for a new house and have your heart set on one.</p>
      <Lottie options={{ animationData: House }} height={200} width={200} />
      <p>The owner has put it up for $550,000. If you want the house immediately, you can pay the full price, as you would in a market order.</p>
      <p>However, another option available to you would be a limit order. You could say that you aren't willing to pay any more than 525K. The house's price will fluctuate over time, and it is possible that it may at one point hit that price. With your limit order, the purchase would automatically be made the second your condition was met.</p>
      <p>With limit orders, you can set a strict budget for how much you are willing to spend and have the trade automatically execute the second it is within that budget.</p>
    </>,
    <>
      <p>On the flip side, limit orders can also come in handy on the seller's side.</p>
      <p>Let's say you bought twenty shares of a stock when its market price was $100. If you clearly have in your mind that you want to secure a $200 profit from the trade, you can set a limit order to sell your 20 shares the moment it hits a market price of $105.</p>
      <p>The greatest power of a limit order is the level of control it gives you over your trades. But, what if things don't go your way? What if, instead of rallying to $105, the stock tanks, causing you to lose everything?</p>
    </>,
    <>
      <p>To prevent this, stop loss orders were created. These are arguably the most crucial orders you will ever set, as they are your safety net against bad trades.</p>
      <p>You can think of stop loss orders as the inverse of limit orders. Instead of closing a position when an upper threshold is met, they are used to close a position when a lower threshold is met. In other words, if you set a stop loss of $95 in this scenario, you can mitigate your risk and set a maximum you're willing to lose.</p>
      <p>You can also further your control of your orders by setting their term. "Day" orders, as their name suggests, will be valid until the end of the trading day, AKA 4PM EST. "Good 'til Canceled (GTC)" orders, again, as seen in their name, will remain in the system until you manually cancel them.</p>
      <p>If you have your strategies set, as you will learn to do in Level 2, you may be able to step away from your computer entirely and let your trades work their magic.</p>
    </>,
    <>
      <p>But, let's not get ahead of ourselves! We'll get there in time. Until then, let's keep moving on to exchange-traded funds, also known as ETFs.</p>
      <p>These ETFs come in all shapes and sizes. Some cover specific sectors, like tech or banking.</p>
      <p>Some are more risky with high return potential, while others are slow yet solid.</p>
    </>,
    <>
      <p>SPY, in particular, is one that requires special attention. It is the ETF that represents the entire S&P 500. It is virtually one of the safest investments on the stock market because it is so heavily balanced; no one company's downfall could single handedly drag it down.</p>
      <p>On the flip side, there are also ETFs that are composed of just a single stock. For example, let's take a look at NVDL and NVDS, single-stock ETFs of the now world-renowned company, Nvidia.</p>
    </>,
    <>
      <p>Over the course of the past few years, Nvidia's stock has exploded. It has gone from being one of many large stocks in the semiconductor industry to touching the title of world's largest company in a never-before-seen level of speed.</p>
      <p>But if you wanted to heighten your gains even further, you could make use of a leveraged ETF. Leveraged ETFs take existing stocks or ETFs and multiply their returns by a set factor.</p>
    </>,
    <>
      <p>Now, finally, let's take a brief look at some basic statistics you can use to understand any stock or ETF.</p>
      <FundamentalDataWidget symbol="NASDAQ:AAPL" />
      <p>These are some of the most common statistics you can see when searching for a stock. There are other useful ones, but as they are more complex and involve other topics, we'll save them for future Levels.</p>
    </>,
    <>
      <p>We have already discussed Bid and Ask prices in the past, and if you need a review, check out Lesson 1 of Level 1B. As for the numbers after the "x," they represent limit orders placed on the stock. For example, let's take a look at the Bid of 234.73 x 200. The "x 200" represents the fact that at this snapshot in time, various limit orders exist to buy 200 shares of AAPL with a limit price of $234.73.</p>
      <p>Daily and 52-Week Ranges, again, fall into the self-explanatory category—they simply provide the range of prices the security has had within the day and year. It is important to note, though, that these are just the ranges of price present during the normal trading hours. They don't account for any prices hit while the market is closed.</p>
    </>,
    <>
      <p>Volume, on the other hand, is an extremely useful stat to keep track of. Essentially, it is a measure of the number of shares actively changing hands at any given moment. The greater a stock's volume, the greater its liquidity, and the stronger its price movements usually are.</p>
      <p>It follows logically that volume is greatest during the power hour. The reason behind strong power hour moves is the simple fact that generally, more people trade at the beginnings and ends of days.</p>
      <p>It is also important to remember the concept of relativity. The larger a company, the larger its volume will consistently be. You can only really know if volume is "high" or "low" by checking what it usually is under normal conditions.</p>
    </>,
    <>
      <p>But, if you're the curious type, you may now be wondering: how can you really tell if a company is small or big? Can't there be large companies that you may never have heard of?</p>
      <p>Well, market cap exists for this exact reason, to quantify the size of a company. Put simply, it is the number of shares that exist of a stock multiplied by the value, or current price of those shares. The larger a company's market cap, the greater its size.</p>
      <p>For reference, companies with a market cap under $2 billion are considered to be small cap, those between $2 billion and $10 billion mid cap, and those above $10 billion to be large cap.</p>
    </>,
    <>
      <p>And last but not least, let's take a look at dividends. As described in Lesson 2 of Level 1B, the dividend yield is the percentage of the stock's current price you will receive within a period of 12 months. The ex-dividend date (for all intents and purposes) is the next date all shareholders will receive their dividend payments.</p>
      <p>Congratulations! You've finished the lesson.</p>
    </>,
  ];

  return (
    <ModuleTemplate 
      title="A Miscellaneous Masterclass" 
      lessonId="1c2"
    userId={user.id}
      onNext={handleNext}
      onPrevious={handlePrevious}
      totalSteps={content.length}
      currentStep={step + 1}
      nextLessonPath="/level-1/c/quiz-2"
      previousLessonPath="/level-1/c/quiz-1"
      onStepChange={handleStepChange} // Add this prop
    >
      {content.slice(0, step + 1).map((item, index) => (
        <div key={index}>{item}</div>
      ))}
    </ModuleTemplate>
  );
};

export default SubLevelCLesson2;