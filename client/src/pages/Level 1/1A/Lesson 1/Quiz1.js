import React from 'react';
import QuizTemplate from '../../../../components/common/QuizTemplate';

const questions = [
  {
    question: "What is a stock?",
    options: [
      { text: "A piece of a company", explanation: "This description actually matches that of a share. A stock is the collective name for all of the shares of a company put together." },
      { text: "All of the shares of a company", explanation: "Correct!", isCorrect: true },
      { text: "The same thing as a company", explanation: "Close, but not quite. The critical difference is that the company can exist without stock. However, a company can issue, AKA distribute, stock to allow others to have a piece of ownership in the company. In reality, the term “stock” refers to all of the shares (pieces of ownership) of a company." },
      { text: "The abbreviation for a company", explanation: "This description actually matches that of a ticker. A stock is the collective name for all of the shares of a company put together. Tickers are unique names assigned to stocks." }
    ],
    correctAnswer: "All of the shares of a company",
    xp: 10
  },
  {
    question: "Why do people buy/sell stocks?",
    options: [
      { text: "To make money by avoiding taxes", explanation: "Unfortunately, although possible loopholes may come in handy, participating in the stock market usually increases the amount you will have to pay in taxes." },
      { text: "To make money when companies make money", explanation: "Close, but not quite. Yes, when companies do well, their stocks generally go up in value. However, companies can still make money and have their stocks go down in value." },
      { text: "To make money in an easier way than working.", explanation: "People may wish this was true, but it’s unfortunately not the case. In reality, learning how to navigate the stock market takes time and energy, but we’ll get you there soon enough!" },
      { text: "To make money through differences in stock price over time", explanation: "Correct! By buying a stock when its price is low and selling it when its price is higher, your profit becomes the difference between those prices. However, if you buy when its price is high and sell when its price is lower, you will lose the difference.", isCorrect: true }
    ],
    correctAnswer: "To make money through differences in stock price over time",
    xp: 10
  },
  {
    question: "What does it really mean to own a “share” of a company?",
    options: [
      { text: "A small piece of ownership in the company", explanation: "Right on!", isCorrect: true },
      { text: "A right to the company’s products", explanation: "It would be nice, but no—owning shares of a company does not give you any benefit when it comes to their actual business. When you own a share, you’re actually owning a microscopic piece of the company itself." },
      { text: "A percentage of the company’s annual revenue", explanation: "Not exactly. Owning shares of a company does not necessarily give you the right to that company’s revenue. When you own a share, you’re actually owning a microscopic piece of the company itself." },
      { text: "A guarantee of certain profits from the company", explanation: "We wish, but there is no set guarantee of profits when you buy shares of a company. When you own a share, you’re actually owning a microscopic piece of the company itself." }
    ],
    correctAnswer: "A small piece of ownership in the company",
    xp: 10
  },
  {
    question: "When you invest, what is the cost basis?",
    options: [
      { text: "The amount you initially spent.", explanation: "Nice!", isCorrect: true },
      { text: "The reasoning behind the current price of the stock.", explanation: "Not quite. As this is a definition, there is no explanation; it simply is." },
      { text: "The market price of the stock when you sell it.", explanation: "Not quite. As this is a definition, there is no explanation; it simply is." },
      { text: "The current market price of the stock.", explanation: "Not quite. As this is a definition, there is no explanation; it simply is." }
    ],
    correctAnswer: "The amount you initially spent.",
    xp: 10
  }
];

const Quiz1 = ({ user }) => {
  if (!user) {
    return <div>Loading...</div>; // Render a loading state while fetching user data
  }
  const handleComplete = () => {
    console.log("Quiz completed!");
    // Handle completion logic here
  };

  return (
    <QuizTemplate
      title="Quiz 1"
      quizId="1a1-quiz"
      levelNumber="1"
      sublevelLetter="A"
      lessonNumber="1"
      userId={user.id}
      questions={questions}
      onComplete={handleComplete}
      nextPath="/level-1/a/lesson-2"
      previousPath="/level-1/a/lesson-1"
    />
  );
};

export default Quiz1;
