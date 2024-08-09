import React from 'react';
import QuizTemplate from '../../../../components/common/QuizTemplate';

const SubLevelCLesson2Quiz = ({ user }) => {
    if (!user) {
        return <div></div>; // Render a loading state while fetching user data
      }
  const questions = [
    {
      question: "When would you use a stop loss order?",
      options: [
        {
          text: "In order to buy a stock at its current price",
          isCorrect: false,
          explanation: "This is actually a market order. With a stop loss, you set a price below the market price of a certain security to automatically close your position at, safeguarding against possible losses."
        },
        {
          text: "In order to enter into a position at a certain, previously-set price",
          isCorrect: false,
          explanation: "To do this, you would use a limit order, not a stop loss. A stop loss would only be used to exit a position at a certain price below the current market price of the security."
        },
        {
          text: "In order to exit a position at a certain price, above the current price",
          isCorrect: false,
          explanation: "To do this, you would use a limit order, not a stop loss. If you set a stop loss order above the current market price, it would execute immediately. In order to only close the security once the price is met, a limit order would be necessary."
        },
        {
          text: "In order to exit a position at a certain price, below the current price",
          isCorrect: true,
          explanation: "Exactly! It is only when you already hold a position that you need to close at a price below the current market price that a stop loss order can be utilized."
        }
      ]
    },
    {
      question: "What is an ETF?",
      options: [
        {
          text: "A collection of stocks or other securities that are traded as a group",
          isCorrect: true,
          explanation: "Perfect!"
        },
        {
          text: "A type of mutual fund",
          isCorrect: false,
          explanation: "We didn't discuss mutual funds, but essentially, a mutual fund is a fund that uses money from its traders to invest in a variety of stocks. The main difference between mutual funds and ETFs is that mutual funds are actively managed by a fund manager, while the compositions of ETFs generally don't change over time."
        },
        {
          text: "A stock that represents a specific sector of the market",
          isCorrect: false,
          explanation: "An ETF can be used to represent the success of a certain sector, but it cannot be called a stock, as it does not represent a company."
        },
        {
          text: "A different version of a stock",
          isCorrect: false,
          explanation: "An ETF can be used to reduce the price needed to invest in a specific security, but it is not just a different version of a stock—it usually is comprised of more than one stock, and even when it isn't, there are always fundamental differences between ETFs of stocks and the underlying stocks themselves."
        }
      ]
    },
    {
      question: "Why would you invest in a leveraged ETF?",
      options: [
        {
          text: "To increase the scale of your returns in the long term",
          isCorrect: false,
          explanation: "Although leveraged ETFs offer to multiply your returns by an X factor, they suffer from price decay. This means that over time, no matter the success of the underlying security, their prices tend to decrease."
        },
        {
          text: "To increase the scale of your returns in the short term",
          isCorrect: true,
          explanation: "Well done! Leveraged ETFs offer to multiply your returns by an X factor, but they are high risk securities that suffer from price decay. Over time, no matter the successes of the underlying security, their prices tend to decrease."
        },
        {
          text: "To reduce risk within your portfolio",
          isCorrect: false,
          explanation: "Leveraged ETFs are high-risk securities, and are not safe for a low-risk portfolio. Just as profits are magnified, so are losses, making their inherent risk dangerous for inexperienced traders."
        },
        {
          text: "To diversify your portfolio",
          isCorrect: false,
          explanation: "Leveraged ETFs are not appropriate for diversification. They are high-risk securities, and although their returns are magnified in the short term, their prices tend to decay over time."
        }
      ]
    }
  ];

  const handleComplete = (results) => {
    console.log(`Quiz completed! `);
  };

  return (
    <QuizTemplate
      title="A Miscellaneous Masterclass Quiz"
      quizId="1c2-quiz"
      level_number="1"
      sublevel_letter="C"
      lesson_number="2"
    userId={user.id}
      questions={questions}
      onComplete={handleComplete}
      nextPath="/dashboard"
      previousPath="/level-1/c/lesson-2"
    />
  );
};

export default SubLevelCLesson2Quiz;