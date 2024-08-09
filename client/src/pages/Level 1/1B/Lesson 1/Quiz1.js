import React from 'react';
import QuizTemplate from '../../../../components/common/QuizTemplate';

const SublevelBLesson1Quiz1 = ({ user }) => {
    if (!user) {
        return <div></div>; // Render a loading state while fetching user data
      }
  const questions = [
    {
      question: "What does it take to shift the price of a stock upwards?",
      options: [
        {
          text: "There have to be more sellers than buyers.",
          isCorrect: false,
          explanation: "Let's come back to our analogy with the scale. If you remember, when there are more sellers than buyers, there are fewer cubes on the demand side of the scale. Thus, to compensate, the cubes on the supply side must also shrink, reducing the stock's price."
        },
        {
          text: "There have to be more buyers than sellers.",
          isCorrect: true,
          explanation: "Perfect! Coming back to our analogy with the scale, when there are more buyers than sellers, the demand side of the scale will be larger. Thus, to compensate, the supply must grow in value, increasing the stock's price."
        },
        {
          text: "The bid needs to be less than the ask.",
          isCorrect: false,
          explanation: "Actually, the bid price will always be lesser than the ask. It is this spread that allows for stocks' prices to move in the first place. It is when the sale price of large amounts of stock is closer to the ask than the bid when the market price of a stock goes up."
        },
        {
          text: "There has to be less demand than supply.",
          isCorrect: false,
          explanation: "Let's come back to our analogy with the scale. When you decrease the demand, you are increasing the number of sellers (reducing the number of cubes on the demand side). Thus, to compensate, the cubes on the supply side must also shrink, reducing the stock's price."
        }
      ]
    },
    {
      question: "When a stock's value is plummeting extremely quickly, what does it mean is happening?",
      options: [
        {
          text: "The number of buyers is significantly larger than the number of sellers.",
          isCorrect: false,
          explanation: "Well, let's remember our analogy. When there are more buyers than sellers, there are more cubes on the demand side of the scale. Thus, to compensate, the cubes on the supply side must also grow, increasing the stock's price."
        },
        {
          text: "There are a large amount of both sellers and buyers.",
          isCorrect: false,
          explanation: "A large amount of both sellers and buyers would actually cancel each other out, causing the price to change very little."
        },
        {
          text: "Many trades are occurring at or near the bid.",
          isCorrect: true,
          explanation: "Exactly! When most trades of a stock occur near the bid (AKA below the market price), the market price will shift lower to account for this. For a steep decline in price to happen, trades would need to continuously occur near the bid."
        },
        {
          text: "Many trades are occurring at or near the ask.",
          isCorrect: false,
          explanation: "Actually, when most trades of a stock occur near the ask (AKA above the market price), the market price will shift higher to account for this. For a steep decline in price to happen, trades would need to continuously occur near the bid, not the ask."
        }
      ]
    },
    {
      question: "What happens when the bid is closer to market price than the ask?",
      options: [
        {
          text: "The price goes up",
          isCorrect: false,
          explanation: "Well, having the bid closer to market price than the ask doesn't actually change anything. For the price to shift in any direction, orders have to actually be executed. Where they are executed doesn't depend on how close the market price is to the bid (or the ask), but rather whether traders are willing to meet those price differences."
        },
        {
          text: "The price goes down",
          isCorrect: false,
          explanation: "Well, having the bid closer to market price than the ask doesn't actually change anything. For the price to shift in any direction, orders have to actually be executed. Where they are executed doesn't depend on how close the market price is to the bid (or the ask), but rather whether traders are willing to meet those price differences."
        },
        {
          text: "The price is not affected",
          isCorrect: true,
          explanation: "Excellent! For the price to shift in any direction, orders have to actually be executed. Where they are executed doesn't depend on how close the market price is to the bid (or the ask), but rather whether traders are willing to meet those price differences."
        },
        {
          text: "More traders enter the market",
          isCorrect: false,
          explanation: "Actually, the number of people actively trading a stock isn't affected by bid or ask prices at all."
        }
      ]
    }
  ];

  const handleComplete = () => {
    // Handle quiz completion
    console.log("Quiz completed!");
  };

  return (
    <QuizTemplate
      title="Quiz 1"
      quizId="1b1-quiz"
      level_number="1"
      sublevel_letter="B"
      lesson_number="1"
    userId={user.id}
      questions={questions}
      onComplete={handleComplete}
      nextPath="/level-1/b/lesson-2"
      previousPath="/level-1/b/lesson-1"
    />
  );
};

export default SublevelBLesson1Quiz1;