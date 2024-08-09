import React, { useState, useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import ModuleTemplate from '../../../../components/common/ModuleTemplate';
import Tooltip from '../../../../components/common/Tooltip';
import { AdvancedRealTimeChart } from "react-ts-tradingview-widgets";
import Open from '../../../../assets/images/Open.svg';
import OpenClose from '../../../../assets/images/Open and Close.svg';
import OpenCloseLowHigh from '../../../../assets/images/Open Close Low High.svg';
import OpenCloseLow from '../../../../assets/images/Open Close and Low.svg';
import Red from '../../../../assets/images/Red.svg';
import WickBody from '../../../../assets/images/Wick and Body.svg';
import Carousel from './Carousel.js';
import CandleLabelingExercise from './CandleLabelingExercise';

const SubLevelCLesson1 = ({ user }) => {
    
    const [step, setStep] = useState(0);
  const [exerciseCompleted, setExerciseCompleted] = useState(false);

  const location = useLocation();
  
    useEffect(() => {
      if (location.state && location.state.goToEnd) {
        setStep(content.length - 1);
      }
    }, [location]);
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
  
  

  const handleExerciseComplete = useCallback((completed) => {
    setExerciseCompleted(completed);
  }, []);
    const candleImages = [
        { 
          src: Open, 
          caption: "Open", 
          description: "The price at which the stock starts trading on the candle interval."
        },
        { 
          src: OpenClose, 
          caption: "Close", 
          description: "The starting and ending prices on the interval. The body of the candle represents this range."
        },
        { 
            src: OpenCloseLow, 
            caption: "Low", 
            description: "The bottom of the lower wick represents the lowest price reached on the interval."
          },
        { 
          src: OpenCloseLowHigh, 
          caption: "High", 
          description: "The top of the upper wick represents the highest price reached on the interval."
        },
        { 
          src: Red, 
          caption: "Red Candle", 
          description: "A red candle indicates that the price decreased on the interval. As you can see, the open is above the close."
        },
        { 
          src: WickBody, 
          caption: "Wick and Body", 
          description: "The body shows the open-close range, while the wicks show the full price range."
        }
      ];
    
    

  const TradingViewWidget = ({ id }) => (
    <AdvancedRealTimeChart
      symbol="NASDAQ:AAPL"
      interval="D"
      container_id={`tradingview_chart${id}`}
      height={400}
      width="100%"
      allow_symbol_change="true"
      style="3"
      hide_volume="true"
      timezone="America/New_York"
      hide_side_toolbar="true"
    />
  );
  if (!user) {
    return <div></div>; // Render a loading state while fetching user data
  }

  const content = [
    <>
      <p>Throughout the past few lessons, we have looked at stock prices at various moments in time, as well as general market trends in the form of line graphs. In this lesson, let's dive deeper into what we're looking for in these charts.</p>
      <p>The most basic type of stock chart is the line graph. Let's take a look at Apple's stock chart:</p>
      <TradingViewWidget id="1" />
      <p>The price scale of the chart is on the right. The time scale of the chart is on the bottom. If you can't quite remember how graphs work, to find the value of a stock at any given point in time, you draw a vertical line up from the time scale and a horizontal line across from the price scale.</p>
      <p>The body of the chart shows the price action of the stock, AKA, how its price has changed over time. To change either scale, you can zoom in or out on either side. Try it out now!</p>
      <p>At the top, we get a bit more information about the chart we're looking at. Most importantly, of course, we have the ticker and the name of the stock we're looking at.</p>
    </>,
    <>
      <p>We also have the interval set to 1D, or one day. If you look closely at the chart, you can see that it is simply a set of points connected by straight lines. Each point represents the closing price of the stock for that day.</p>
      <p>Try changing the interval to 1m (one minute) to see how the chart changes. It looks like the chart has completely changed, right? Well, switch back and forth and keep a close eye on the time scale. As you make the interval larger, you're automatically switched to a larger time scale, and vice versa.</p>
      <p>Smaller time scales are useful when examining shorter term trends, just as larger time scales are helpful when looking at longer term trends. But although line graphs are the easiest on the eyes, they simply do not contain enough information to be useful. It's not as noticeable on larger time scales, but on anything shorter than six months, the issues with them become increasingly problematic. No matter which intervals you choose, you will always be missing the information in between the points, which is always essential to proper analysis.</p>
      <TradingViewWidget id="2" />
    </>,
    <>
      <p>This downside is why candlestick charts were invented. Let's take a deeper look at what a candle even is.</p>
      <p>A candle serves the same purpose in a candlestick chart as a single point does in a line chart. However, it contains much more of the information traders need to make decisions.</p>
      <p>The two main parts of a candle are the body and the wick (also known as the shadow). These parts, alongside the color of the candle, reveal five crucial pieces of information about a stock at any given point in time: the open, the close, the high, the low, and the direction.</p>
      <Carousel images={candleImages} blurred={step === 3 && !exerciseCompleted} />
    </>,
    <>
      <p>All of the information revealed through a candle revolves around the interval length chosen. For example, if the interval is 1m, like it was with the line graph earlier, the candle reveals information about a single minute in a stock's history.</p>
      <p>The open is the stock's price at the start of that minute. The close is the stock's price at the end of that minute. If you were to overlay a line graph on top of a candlestick chart, this is where each point of the line graph would be.</p>
      <p>The low is the lowest the stock's price went during that minute. Sometimes, a stock never dips lower than its open price, in which case there is no lower wick. Other times, a stock's price dips extremely low before pulling up, in which case the lower wick would be far longer.</p>
      <p>The high is simply the opposite of the low, as it is the highest the stock's price went during that minute.</p>
      <p>Finally, the stock's color reveals its direction. If the candle is green, it means the stock went up in price over the course of this minute. However, if it were red, it would indicate that the stock's price dropped over the course of this minute from the top of the candle body to the bottom.</p>
      <CandleLabelingExercise onComplete={handleExerciseComplete} />
    </>,
    <>
      <p>Now, let's come back to the bigger picture. Change the chart style to candlestick by selecting Candles from the top toolbar.</p>
      <p>It may seem a bit of an overwhelming change at first, and it may be easy to use line graphs as a crutch, but with practice, you'll soon become familiar with the candlestick chart.</p>
      <TradingViewWidget id="3" />
      <p>Now, let's dig a little deeper into what exactly this chart shows us. Just like in the line graph, at the far right of the chart is the current market price of the stock, while the candles before show how the stock reached that price.</p>
      <p>But, if you drag the chart over to 9:30AM this morning, you'll notice that something strange happened. There's a time gap! 4:00PM of one day becomes 9:30AM of the next, with a gap in the stock price as well. Why?</p>
    </>,
    <>
      <p>Well, it's because just like any physical market, the stock market is only open at certain times, on certain days.</p>
      <p>Just like your school or workplace, the stock market is closed on all national holidays and all weekends. It's also only open from 9:30AM to 4:00PM Eastern Time, no matter where in the world you live.</p>
      <p>That being said, these hours only apply to the New York Stock Exchange (NYSE), AKA the American stock market. For example, the Chinese stock market, which runs on the Shanghai Stock Exchange, is open from 9:30AM to 3:00PM China Standard Time, with a no-trading break from 11:30AM to 1:00PM.</p>
    </>,
    <>
      <p>But, you might be wondering: if the stock market closes outside trading hours, how do stock prices change during this time?</p>
      <p>Well, it's because of after hours trading. Institutional investors, as well as some traders just like you, sometimes like to trade outside of trading hours. This is allowed between 4:00PM and 8:00PM ET and 4:00AM and 9:30AM ET and comes in handy when important economic or financial news is released outside trading hours.</p>
      <p>The flip side of after hours trading is that there are very, very few traders, relatively speaking. This means any orders you place may not be instantly filled.</p>
    </>,
    <>
      <p>Not all trading hours are created equally, either. More specifically, the first and last trading hour of each trading day (AKA, 9:30AM to 10:30AM and 3:00PM to 4:00PM) is known as a power hour.</p>
      <p>During a power hour, the stock market moves much more aggressively. There are many more active traders, meaning stock prices change extremely quickly as market makers adjust their bids and asks. For beginner traders, it is advised not to trade during a power hour, as it is extremely difficult and can often lose you more money than it is worth. However, just like we talked about before, with high risk comes the potential for high reward, making the power hour the best friend of experienced traders.</p>
    </>,
    <>
      <p>Congratulations! You've finished the lesson.</p>
    </>
  ];

  const isContinueDisabled = () => {
    if (step === 3 && !exerciseCompleted) {
      return true;
    }
    return false;
  };

  return (
    <ModuleTemplate 
      title="Charts+" 
      lessonId="1c1"
      level_number="1"
      sublevel_letter="C"
      lesson_number="1"
    userId={user.id}
      onNext={handleNext}
      onPrevious={handlePrevious}
      totalSteps={content.length}
      currentStep={step + 1}
      isContinueDisabled={isContinueDisabled()}
      nextLessonPath="/level-1/c/quiz-1"
      previousLessonPath="/level-1/b/quiz-2"
      onStepChange={handleStepChange}
    >
      {content.map((item, index) => (
        <div key={index}>{item}</div>
      ))}
    </ModuleTemplate>
  );
};

export default SubLevelCLesson1;