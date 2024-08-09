import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { IoMdClose, IoMdArrowBack, IoMdArrowForward, IoMdRefresh } from 'react-icons/io';
import axios from 'axios';
import ExoLogo from "../../assets/images/thinexologo.svg";
import { motion } from 'framer-motion';

const QuizTemplate = ({ title, questions, quizId, userId, nextPath, previousPath, levelNumber, sublevelLetter, lessonNumber }) => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);
  const totalQuestions = questions.length;

  const decodeAnswers = (encodedAnswers, questions) => {
    return encodedAnswers.split(',').map((answer, index) => {
      const selectedOptionIndex = parseInt(answer, 10) - 1;
      return selectedOptionIndex >= 0 ? {
        selectedOption: questions[index].options[selectedOptionIndex],
        isCorrect: questions[index].options[selectedOptionIndex].isCorrect
      } : null;
    });
  };

  useEffect(() => {
    const fetchUserAndProgress = async () => {
      setIsLoading(true);
      try {
        const [userResponse, progressResponse] = await Promise.all([
          axios.get(`https://api.greenstickusa.com/api/users/${userId}`),
          axios.get(`https://api.greenstickusa.com/api/progress/quiz-progress/${userId}/${quizId}`)
        ]);

        setUser(userResponse.data);

        const quizProgress = progressResponse.data.progress;
        if (quizProgress) {
          const decodedAnswers = decodeAnswers(quizProgress.answers, questions);
          setAnswers(decodedAnswers);

          const firstUnansweredIndex = decodedAnswers.findIndex(answer => answer === null);
          setCurrentQuestionIndex(firstUnansweredIndex === -1 ? totalQuestions - 1 : firstUnansweredIndex);

          setIsCompleted(decodedAnswers.every(answer => answer !== null));
        }
      } catch (error) {
        console.error('Error fetching user data or progress:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserAndProgress();
  }, [userId, quizId, questions, totalQuestions]);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleSubmit = async () => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = {
      selectedOption: selectedOption,
      isCorrect: selectedOption.isCorrect
    };
    setAnswers(newAnswers);
    setSelectedOption(null);

    const progress = Math.round((newAnswers.filter(a => a !== null).length / totalQuestions) * 100);
    await saveProgress(newAnswers, progress);

    if (newAnswers.every(answer => answer !== null)) {
      setIsCompleted(true);
      await handleComplete(newAnswers);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else if (previousPath) {
      navigate(previousPath);
    }
  };

  const saveProgress = async (updatedAnswers, progress) => {
    try {
      await axios.post('https://api.greenstickusa.com/api/progress/update-quiz-progress', {
        userId,
        quizId,
        answers: updatedAnswers,
        progress,
        title,
        levelNumber,
        sublevelLetter,
        lessonNumber
      });
    } catch (error) {
      console.error('Error saving quiz progress:', error);
    }
  };

  const handleComplete = async (finalAnswers) => {
    const xp = finalAnswers.filter(answer => answer && answer.isCorrect).length * 10;
    try {
      await axios.post('https://api.greenstickusa.com/api/progress/update-xp', {
        userId,
        xp: xp
      });
    } catch (error) {
      console.error('Error updating XP:', error);
    }
  };

  const handleReset = async () => {
    const resetAnswers = Array(questions.length).fill(null);
    setAnswers(resetAnswers);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsCompleted(false);
    await saveProgress(resetAnswers, 0);
  };

  const currentQuestion = questions[currentQuestionIndex];
  const currentAnswer = answers[currentQuestionIndex];

  return (
    <div className="bg-white p-6 rounded-lg max-w-6xl mx-auto relative min-h-screen font-[Poppins]">
      <div className="flex justify-between items-center mb-4">
        <button 
          className="text-lg p-2 hover:bg-gray-200 rounded-md border border-gray-300"
          onClick={() => navigate('/dashboard')}
          aria-label="Close module"
        >
          <IoMdClose />
        </button>
        <div className="flex items-center space-x-2">
          {answers.map((answer, index) => (
            <motion.div
              key={index}
              className={`w-4 h-4 rounded-full ${
                answer === null
                  ? 'bg-gray-300'
                  : answer.isCorrect
                  ? 'bg-green-500'
                  : 'bg-red-500'
              }`}
              animate={{
                scale: index === currentQuestionIndex ? [1, 1.2, 1] : 1,
              }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>
        <Link to="/exo" className="w-8 h-8">
          <img src={ExoLogo} alt="Exo" className="w-full h-full" />
        </Link>
      </div>
      
      <h1 className="text-4xl font-bold mb-6">{title}</h1>
      
      <div>
        <h2 className="text-2xl font-semibold mb-4">{currentQuestion.question}</h2>
        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <button
                className={`block w-full text-left p-4 rounded-md transition-colors duration-300 border
                  ${currentAnswer
                    ? option.isCorrect 
                      ? 'bg-green-100 border-green-500' 
                      : currentAnswer.selectedOption === option
                      ? 'bg-red-100 border-red-500'
                      : 'bg-white border-gray-300' 
                    : selectedOption === option 
                      ? 'bg-gray-200 border-gray-500' 
                      : 'bg-white border-gray-300 hover:bg-gray-100'}`}
                onClick={() => !currentAnswer && handleOptionSelect(option)}
                disabled={currentAnswer !== null}
              >
                {option.text}
              </button>
              {currentAnswer && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                  className="mt-2 p-3 text-sm text-gray-700 bg-gray-50 rounded-md"
                >
                  {option.explanation}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-8 flex justify-between items-center">
        <button
          className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center transition-colors duration-300 hover:bg-gray-300"
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0 && !previousPath}
        >
          <IoMdArrowBack className="text-gray-600" />
        </button>

        {!currentAnswer && (
          <button
            className="bg-gs-dark-green text-white font-bold py-2 px-6 rounded-full transition-colors duration-300 hover:bg-gs-light-green"
            onClick={handleSubmit}
            disabled={!selectedOption}
          >
            Submit
          </button>
        )}

        <button
          className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center transition-colors duration-300 hover:bg-gray-300"
          onClick={handleNext}
          disabled={currentQuestionIndex === totalQuestions - 1}
        >
          <IoMdArrowForward className="text-gray-600" />
        </button>
      </div>

      {isCompleted && (
        <div className="mt-8 flex flex-col items-center">
          <p className="text-xl font-semibold mb-4">Quiz Completed!</p>
          <Link 
            to={nextPath || "/dashboard"} 
            className="bg-gs-dark-green text-white font-bold py-2 px-6 rounded-full hover:bg-gs-light-green transition-colors duration-300 mb-4"
          >
            Next Lesson
          </Link>
          <button
            className="bg-gs-dark-green text-white font-bold py-2 px-6 rounded-full transition-colors duration-300 hover:bg-gs-light-green flex items-center"
            onClick={handleReset}
          >
            <IoMdRefresh className="mr-2" /> Reset Quiz
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizTemplate;