import React from 'react';
import QuizTemplate from '../../../../components/common/QuizTemplate';

const SubLevelBLesson2Quiz = ({ user }) => {
    if (!user) {
        return <div></div>; // Render a loading state while fetching user data
      }
  const questions = [
    {
      question: "When would you look to take on short positions?",
      options: [
        {
          text: "When you think prices will go up over time",
          isCorrect: false,
          explanation: "In this case, you would actually take on long positions, not short ones."
        },
        {
          text: "When you want to maximize profit",
          isCorrect: false,
          explanation: "Short positions do not necessarily have more profit associated with them."
        },
        {
          text: "When you only want to hold a stock in the short term",
          isCorrect: false,
          explanation: "The word 'short' in 'short position' does not actually refer to the period you plan to hold a stock, but rather the type of trade you are conducting. Long positions are taken when you think prices will go up, while short positions are taken when you think prices will go down."
        },
        {
          text: "When you think prices will go down",
          isCorrect: true,
          explanation: "Correct! Short positions are taken when you expect the price of a stock to decrease."
        }
      ]
    },
    {
      question: "What does it mean if someone says they're bullish on MSFT?",
      options: [
        {
          text: "They think its price will go up in the short term, but down in the long term.",
          isCorrect: false,
          explanation: "The words 'bullish' and 'bearish' only refer to trends in the market, with no relation with time."
        },
        {
          text: "They think its price will go up.",
          isCorrect: true,
          explanation: "Perfect! To be bullish is to think a stock's price will go up, while to be bearish is to think a stock's price will go down."
        },
        {
          text: "They think its price will go up in the long term, but down in the short term.",
          isCorrect: false,
          explanation: "The words 'bullish' and 'bearish' only refer to trends in the market, with no relation with time. To be bullish is to think a stock's price will go up, while to be bearish is to think a stock's price will go down."
        },
        {
          text: "They think its price will go down.",
          isCorrect: false,
          explanation: "Actually, to be bullish is to think a stock's price will go up, while to be bearish is to think a stock's price will go down."
        }
      ]
    },
    {
      question: "What is your profit/loss if you Sell to Open (short) 25 shares of a stock at $75 and Buy to Close at $77? Enter a negative number for a loss and a positive number for a profit.",
      options: [
        {
          text: "-50",
          isCorrect: true,
          explanation: "Correct! For any position, your profit/loss is the price you bought at minus the price you sold at, multiplied by the number of shares you had. In this case, that would be (75-77)*25, which is -50. In the case of long positions, you buy before you sell, while in the case of shorts like this, you sell before you buy."
        },
        {
          text: "50",
          isCorrect: false,
          explanation: "This would be correct if it were a long position, but for a short position, the calculation is reversed."
        },
        {
          text: "-25",
          isCorrect: false,
          explanation: "You're on the right track with a negative number, but don't forget to multiply by the number of shares."
        },
        {
          text: "25",
          isCorrect: false,
          explanation: "Remember, for a short position, you want the price to go down. Since it went up, you've incurred a loss."
        }
      ]
    },
    {
      question: "What types of investments will the majority of your portfolio consist of if you're looking to minimize risk? (Select all that apply)",
      options: [
        {
          text: "Blue-chip stocks",
          isCorrect: true,
          explanation: "Correct! Blue-chips are stocks that are known to be stable, and thus relatively less risky. These are the biggest names in their industries, like Apple, Microsoft, JP Morgan, and many other stocks that have historically consistent growth."
        },
        {
          text: "Long positions only",
          isCorrect: false,
          explanation: "Because the market trends upwards over long periods of time, longs are generally less risky than shorts. However, investing in only longs is not necessarily less risky."
        },
        {
          text: "Stocks with a stable reputation",
          isCorrect: true,
          explanation: "Correct! This is the same as blue-chip stocks; they are, by definition, stocks with a stable reputation, and are thus less risky. These are the biggest names in their industries, like Apple, Microsoft, JP Morgan, and many other stocks that have historically consistent growth."
        },
        {
          text: "Stocks with high dividend yields",
          isCorrect: true,
          explanation: "Correct! Stocks with high dividend yields have a certain profit guarantee, which reduces their inherent risk."
        },
        {
          text: "Stocks that have grown quickly recently",
          isCorrect: false,
          explanation: "Stocks that have only performed well in the short term aren't reliable enough to be considered for a minimal risk portfolio."
        },
        {
          text: "Short positions only",
          isCorrect: false,
          explanation: "Short positions are generally riskier investments and should only have a very small place in a low-risk portfolio."
        }
      ]
    }
  ];

  const handleComplete = (results) => {
    // Calculate XP
    let xp = 0;
    if (results[0]) xp += 10;
    if (results[1]) xp += 10;
    if (results[2]) xp += 10;
    if (results[3]) xp += 15;

    console.log(`Quiz completed! You earned ${xp} XP.`);
    // Here you would typically update the user's XP in your state management system
  };

  return (
    <QuizTemplate
      title="How to Make Money 101 - Quiz"
      quizId="1b2-quiz"
      level_number="1"
      sublevel_letter="B"
      lesson_number="2"
    userId={user.id}
      questions={questions}
      onComplete={handleComplete}
      nextPath="/level-1/c/lesson-1"
      previousPath="/level-1/b/lesson-2"
    />
  );
};

export default SubLevelBLesson2Quiz;