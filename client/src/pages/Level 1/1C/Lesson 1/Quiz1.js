import React from 'react';
import QuizTemplate from '../../../../components/common/QuizTemplate';

const SubLevelCLesson1Quiz = ({ user }) => {
    if (!user) {
        return <div></div>; // Render a loading state while fetching user data
      }
  const questions = [
    {
      question: "What is the main benefit of using a candlestick chart over a linear chart?",
      options: [
        {
          text: "To simplify the visual representation of stock prices",
          isCorrect: false,
          explanation: "Actually, candlestick charts can be more complicated to interpret than linear charts. However, they provide more detailed price action information, making them more useful. With each datapoint, an open, close, high, and low are displayed, multiplying the amount of information the graph displays by 4 relative to a linear chart."
        },
        {
          text: "To show the historical performance of a stock over several years.",
          isCorrect: false,
          explanation: "Both linear and candlestick charts show the historical performance of a stock over several years. The real benefit is the fact that candlestick charts provide more detailed information about price action. With each datapoint, an open, close, high, and low are displayed, multiplying the amount of information the graph displays by 4 relative to a linear chart."
        },
        {
          text: "To provide a detailed overview of a stock's price movements over a set period.",
          isCorrect: true,
          explanation: "Exactly! With each datapoint, an open, close, high, and low are displayed, multiplying the amount of information the graph displays by 4 relative to a linear chart."
        },
        {
          text: "To show the price of a stock at a single point in time.",
          isCorrect: false,
          explanation: "When you want to see the price of a stock at a single point in time, you can use either a linear or a candlestick chart to look up that value. The real benefit of the candlestick chart is the fact that it provides more detailed information about price action. With each datapoint, an open, close, high, and low are displayed, multiplying the amount of information the graph displays by 4 relative to a linear chart."
        }
      ]
    },
    {
      question: "What information can you get from the body of a green candle?",
      options: [
        {
          text: "The direction of the price action only",
          isCorrect: false,
          explanation: "Yes, the green color of the candle body does reveal that the stock price moved up during the candle period. However, you can also learn the opening and closing prices of the stock during the candle period as well."
        },
        {
          text: "The prices at the start and end of the candle period",
          isCorrect: false,
          explanation: "Yes, the top and bottom of the candle body do reveal the close and open prices of the stock during the candle period, respectively. However, the green color of the candle body also reveals that the stock price moved up during the candle period."
        },
        {
          text: "Both the direction of the price action and the prices at the start and end of the candle period",
          isCorrect: true,
          explanation: "Exactly!"
        },
        {
          text: "The direction of the price action, the prices at the start and end of the candle period, and the high and low prices reached during the candle period",
          isCorrect: false,
          explanation: "The first two are true, but the body of a green candle only indicates the open and close prices, not the highest and lowest prices. These are found by studying the wick(s) of the candle."
        }
      ]
    },
    {
      question: "What does it mean if the interval of a candlestick chart is set to 1 Day?",
      options: [
        {
          text: "The information on the chart shows the price action of the stock over a one day period.",
          isCorrect: false,
          explanation: "When you set a time period on a linear chart, this is true. However, on a candlestick chart, instead of setting an entire viewing period that the chart will cover, you set a period that each candle will cover. For example, when the interval is 1D, each candle shall represent one day of the stock's price action."
        },
        {
          text: "The chart will update once per day.",
          isCorrect: false,
          explanation: "No matter the interval or type of chart, any good stock graph should update in real time."
        },
        {
          text: "The horizontal axis of the chart will have labels for every one day.",
          isCorrect: false,
          explanation: "Actually, the labeling on the horizontal axis is only affected by how much you zoom in or out of the chart."
        },
        {
          text: "Each candle will represent one day.",
          isCorrect: true,
          explanation: "Precisely!"
        }
      ]
    }
  ];

  const handleComplete = (results) => {
    let xp = results.filter(result => result).length * 10;
    console.log(`Quiz completed! You earned ${xp} XP.`);
  };

  return (
    <QuizTemplate
      title="Charts+ Quiz"
      questions={questions}
      quizId="1c1-quiz"
      level_number="1"
      sublevel_letter="C"
      lesson_number="1"
    userId={user.id}
      onComplete={handleComplete}
      nextPath="/level-1/c/lesson-2"
      previousPath="/level-1/c/lesson-1"
    />
  );
};

export default SubLevelCLesson1Quiz;