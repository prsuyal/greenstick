import React from 'react';
import QuizTemplate from '../../../../components/common/QuizTemplate';

const questions = [
  {
    question: "What is an index?",
    options: [
      { text: "A place where you can trade stocks.", explanation: "Not quite. As this is a definition, there is no explanation; it simply is." },
      { text: "The first stock you buy.", explanation: "Not quite. As this is a definition, there is no explanation; it simply is." },
      { text: "The initial price of a stock.", explanation: "Not quite. As this is a definition, there is no explanation; it simply is." },
      { text: "An entity that displays the performance of a certain portion of the stock market.", explanation: "Correct!", isCorrect: true }
    ],
    correctAnswer: "An entity that displays the performance of a certain portion of the stock market.",
    xp: 10
  },
  {
    question: "If you want to know how most American stocks are doing on a given day, what could you look at?",
    options: [
      { text: "The Dow Jones", explanation: "Actually, the Dow Jones is mainly used to analyze only the most prominent American stocks. The S&P 500 is the index used to analyze most major American stocks." },
      { text: "The S&P 500", explanation: "Correct: The S&P 500 represents the performance of the 500 largest American stocks there are.", isCorrect: true },
      { text: "The NASDAQ", explanation: "Actually, the NASDAQ is mainly used to analyze only the most prominent tech stocks. The S&P 500 is the index used to analyze most major American stocks." },
      { text: "The Nikkei 225", explanation: "Actually, the Nikkei 225 is mainly used to analyze only the most prominent Japanese stocks. The S&P 500 is the index used to analyze most major American stocks." }
    ],
    correctAnswer: "The S&P 500",
    xp: 10
  },
  {
    question: "Given the following scenario, did tech stocks do better or worse than the overall American market on this day? Which two indices are you comparing?\n\nS&P 500: up 0.3%\nDow Jones: up 1.1%\nNASDAQ: up 0.8%\nRussell 2000: up 0.2%",
    options: [
      { text: "Better; comparing S&P 500 and NASDAQ", explanation: "Correct! The NASDAQ (up 0.8%) represents tech stocks and performed better than the S&P 500 (up 0.3%), which represents the overall American market.", isCorrect: true },
      { text: "Worse; comparing S&P 500 and NASDAQ", explanation: "Incorrect. While these are the correct indices to compare, the NASDAQ (up 0.8%) outperformed the S&P 500 (up 0.3%), indicating tech stocks did better, not worse." },
      { text: "Better; comparing Dow Jones and NASDAQ", explanation: "Partially correct. While tech stocks (NASDAQ, up 0.8%) did better, the Dow Jones is not the best representation of the overall American market. The S&P 500 is a better comparison." },
      { text: "Worse; comparing S&P 500 and Russell 2000", explanation: "Incorrect. The Russell 2000 is not specifically for tech stocks, and the comparison doesn't show tech stocks performing worse." }
    ],
    correctAnswer: "Better; comparing S&P 500 and NASDAQ",
    xp: 15
  },
  {
    question: "You notice that the Dow is up 1.2% on a day when the S&P 500 is up 0.2%. Why could this be?",
    options: [
      { text: "Smaller companies' stocks are doing better than more prominent ones today.", explanation: "Since the Dow portrays the most prominent US stocks and is doing better than the S&P 500, it is clear that the smaller companies in the S&P 500 are dragging it down relative to the Dow." },
      { text: "Tech stocks are doing badly today when compared to the general market.", explanation: "It's actually the NASDAQ that portrays tech stocks, not the Dow or the S&P. Since the Dow portrays the most prominent US stocks and is doing better than the S&P 500, it is clear that the smaller companies in the S&P 500 are dragging it down relative to the Dow." },
      { text: "International markets are strong today when compared to US markets.", explanation: "Both the Dow and the S&P are American indices, which means international markets don't come into the picture. Since the Dow portrays the most prominent US stocks and is doing better than the S&P 500, it is clear that the smaller companies in the S&P 500 are dragging it down relative to the Dow." },
      { text: "More prominent companies' stocks are doing better than smaller ones today.", explanation: "Correct! Since the Dow portrays the most prominent US stocks and is doing better than the S&P 500, it is clear that the larger companies are performing better than the smaller ones included in the S&P 500.", isCorrect: true }
    ],
    correctAnswer: "More prominent companies' stocks are doing better than smaller ones today.",
    xp: 15
  }
];

const Quiz2 = ({ user }) => {
  if (!user) {
    return <div></div>; // Render a loading state while fetching user data
  }
  const handleComplete = () => {
    console.log("Quiz completed!");
    // Handle completion logic here
  };

  return (
    <QuizTemplate 
      title="Quiz 2"
      quizId="1a2-quiz"
      level_number="1"
      sublevel_letter="A"
      lesson_number="2"
    userId={user.id}
      questions={questions}
      onComplete={handleComplete}
      nextPath="/level-1/b/lesson-1"
      previousPath="/level-1/a/lesson-2"
    />
  );
};

export default Quiz2;