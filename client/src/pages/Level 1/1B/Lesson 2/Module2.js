import React, { useState } from 'react';
import ModuleTemplate from '../../../../components/common/ModuleTemplate';
import Tooltip from '../../../../components/common/Tooltip';
import Lottie from 'react-lottie';
import BullBear from '../../../../assets/animations/bullbear.json';
import DividendPie from '../../../../assets/animations/Pie Graph.json';

const SubLevelBLesson2 = ({ user }) => {
  const [step, setStep] = useState(0);

  if (!user) {
    return <div></div>; // Render a loading state while fetching user data
  }
  const handleNext = (newStep) => {
    if (step < content.length - 1) {
      setStep(newStep);
    }
  };

  const handleStepChange = (newStep) => {
    setStep(newStep);
  };

  const handlePrevious = (newStep) => {
    if (step > 0) {
      setStep(newStep);
    }
  };

  const bullBearOptions = {
    loop: true,
    autoplay: true, 
    animationData: BullBear,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  const dividendPieOptions = {
    loop: true,
    autoplay: true, 
    animationData: DividendPie,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  const content = [
    <>
      <p>
        Last time, we talked a lot about how the market moves in the short term, but although supply and demand rule the market from hour to hour and day to day, there are larger, overarching trends that affect the market as well.
      </p>
      <p>
        These trends are called <Tooltip term="bull market" definition="A market condition where prices are rising or expected to rise" /> and <Tooltip term="bear market" definition="A market condition where prices are falling or expected to fall" />.
      </p>
      <Lottie options={bullBearOptions} height={400} width={400} />
      <p>
        During bull markets, the market does well, with stocks generally rising in value over an extended period of time. During bear markets, the market does badly, with stocks generally falling in value over an extended period of time.
      </p>
      <p>
        In fact, the terms bull and bear are used universally by those familiar with the stock market. A friend might tell you about how bullish Tesla's stock has been looking lately, and you might be called a bear for not believing them. It may seem strange, but past a certain point, you'll stop being reminded of the animals and be able to see the words with their own definitions.
      </p>
    </>,
    <>
      <p>
        Generally speaking, the market cycles through bullish and bearish periods over time in semi-predictable patterns. If we look at the worst recessions in history, you can see that they almost always come after extended or heightened periods of growth, and vice versa.
      </p>
    </>,
    <>
      <p>
        Now, let's try to break down these long-term trends from a trader's perspective. During bullish periods, the theory of trading is fairly simple. You can buy low, sell high, and make the difference as your profit.
      </p>
      {/* [Placeholder: animation for longs] */}
    </>,
    <>
      <p>
        But what if you want to trade when the market is bearish? How can you make any money if the market refuses to go any direction but down? Well, that's where <Tooltip term="short selling" definition="The sale of a security that is not owned by the seller, or that the seller has borrowed" /> comes into play.
      </p>
    </>,
    <>
      <p>
        When you sell short, you sell shares you don't actually own with the promise that you will buy them back later.
      </p>
      <p>
        Wait, so how does that work? How could you sell shares you don't own? Well, when you place that order with real money, the trading app you use does some work behind the scenes. Essentially, you are borrowing the shares you need from a broker and selling them at market price. Later on, you can buy the shares back, with the trading app returning them to the broker, to close your position.
      </p>
      <p>
        Just like with long trading, your profit (or loss) is the price you sold at minus the price you bought at. The only difference is that with short selling, you sell before you buy.
      </p>
      {/* [Placeholder: animation for shorts] */}
    </>,
    <>
      <p>
        Now, an important point of warning! When making long trades, your maximum loss can only ever be the initial amount you invested. A stock's price can never go negative. However, with short trades, your potential losses are infinite, as a stock's price can rise indefinitely. If you are holding a short position on a stock that rises significantly, you may be forced to close a part or all of your position against your will.
      </p>
      <p>
        But although trading this way can be very lucrative, the literal profit of stock value changes is not the only way to make money off the stock market.
      </p>
    </>,
    <>
      <p>
        Specifically, one, much more sure-fire way of securing a profit is through <Tooltip term="dividends" definition="A distribution of a portion of a company's earnings to shareholders" />.
      </p>
      <p>
        Certain companies guarantee that they will periodically pay their shareholders set amounts of their earnings. This amount is usually a percentage of the stock price, called the dividend yield.
      </p>
      <Lottie options={dividendPieOptions} height={400} width={400} />
    </>,
    <>
      <p>
        For example, IBM has an annual dividend yield of 3.95%. This means that every year you hold IBM, you're almost guaranteed a profit of 3.95% of the stock price, regardless of what happens to the stock itself.
      </p>
      <p>
        It is important to note that "almost," though. Although it is extremely rare, companies do reserve the right to reduce or cancel dividend payments if they are struggling financially.
      </p>
      <p>
        With this in mind, it is important to note that not all trades are created equal. Whenever making a trade, it is important to keep in mind the concept of a <Tooltip term="risk-reward ratio" definition="A measure of the potential profit of an investment against its potential loss" />.
      </p>
      <p>
        Generally, an increase in the potential profitability of a trade comes with an increase in the risk that it ends up costing you. For example, buying stable, dividend-paying, blue-chip stocks like IBM is a completely different ball game from short selling a stock like Tesla's (TSLA), which often undergoes massive swing moves.
      </p>
    </>,
    <>
      <p>
        When one goes long on a blue-chip stock, they can rest peacefully knowing that their position will almost definitely grow in value over time. However, this lack of risk comes with a slower rate of return.
      </p>
      <p>
        On the other hand, if you're willing to take the considerable risk of shorting TSLA, you might be able to make money much faster. But, of course, there are no guarantees. Without proper preparation, you could easily end up losing money.
      </p>
      <p>
        More than anything else, it is absolutely essential that you manage your risk-reward ratio carefully. A portion of your portfolio should be dedicated to low-risk investments like blue-chips, while a portion should be dedicated to higher-risk investments that could provide greater returns in the short term.
      </p>
      <p>
        In the end, your risk tolerance is up to you, but we'll do our best to make sure that no matter how much risk you end up taking, you'll find your way out on top.
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
      title="How to Make Money 101" 
      lessonId="1b2"
    userId={user.id}
      onNext={handleNext}
      onPrevious={handlePrevious}
      totalSteps={content.length}
      currentStep={step + 1}
      nextLessonPath="/level-1/b/quiz-2"
      previousLessonPath="/level-1/b/quiz-1"
      onStepChange={handleStepChange} // Add this prop

    >
      {content.slice(0, step + 1).map((item, index) => (
        <div key={index}>{item}</div>
      ))}
    </ModuleTemplate>
  );
};

export default SubLevelBLesson2;