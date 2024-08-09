import React, { useState, useEffect } from 'react';
import LabelingExercise from '../../../../assets/images/Candle Labeling Exercise.svg';

const CandleLabelingExercise = ({ onComplete }) => {
  const [answers, setAnswers] = useState({
    A: '', B: '', C: '', D: '', E: '', F: '', G: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [allCorrect, setAllCorrect] = useState(false);
  const [allFieldsFilled, setAllFieldsFilled] = useState(false);

  const correctAnswers = {
    A: 'high', B: 'wick', C: 'open', D: 'body', E: 'close', F: 'wick', G: 'low'
  };

  useEffect(() => {
    const filled = Object.values(answers).every(value => value.trim() !== '');
    setAllFieldsFilled(filled);
  }, [answers]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAnswers(prev => ({ ...prev, [name]: value.toLowerCase() }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    const isAllCorrect = Object.keys(answers).every(key => answers[key] === correctAnswers[key]);
    setAllCorrect(isAllCorrect);
  };

  const handleReset = () => {
    setAnswers({A: '', B: '', C: '', D: '', E: '', F: '', G: ''});
    setSubmitted(false);
    setAllCorrect(false);
  };

  useEffect(() => {
    if (submitted && allCorrect) {
      onComplete(true);
    } else {
      onComplete(false);
    }
  }, [submitted, allCorrect, onComplete]);

  const isCorrect = (letter) => answers[letter] === correctAnswers[letter];

  return (
    <div className="flex flex-col md:flex-row bg-white rounded-xl p-6 my-8 shadow-lg">
      <div className="md:w-1/2 mb-4 md:mb-0">
        <img src={LabelingExercise} alt="Candle Labeling Exercise" className="w-full h-auto rounded-lg" />
      </div>
      <div className="md:w-1/2 md:pl-6">
        <h3 className="text-2xl font-bold mb-4 text-gs-dark-green">Candle Labeling Exercise</h3>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            {Object.keys(answers).map((letter) => (
              <div key={letter} className="mb-2">
                <label className="block text-sm font-medium text-gs-dark-gray">
                  {letter}:
                  <input
                    type="text"
                    name={letter}
                    value={answers[letter]}
                    onChange={handleInputChange}
                    className={`mt-1 block w-full rounded-md shadow-sm focus:ring-gs-light-green focus:border-gs-light-green sm:text-sm
                      ${submitted 
                        ? (isCorrect(letter) 
                          ? 'border-green-500 bg-green-50' 
                          : 'border-red-500 bg-red-50') 
                        : 'border-gray-300'}`}
                    disabled={submitted}
                  />
                </label>
                {submitted && !isCorrect(letter) && (
                  <p className="text-xs text-red-500 mt-1">
                    Correct: {correctAnswers[letter]}
                  </p>
                )}
              </div>
            ))}
            <div className="col-span-2">
              {!submitted && (
                <button 
                  type="submit" 
                  className={`w-full px-4 py-2 rounded-md transition duration-300 ease-in-out ${
                    allFieldsFilled
                      ? 'bg-gs-dark-green text-white hover:bg-gs-light-green'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                  disabled={!allFieldsFilled}
                >
                  Submit
                </button>
              )}
              {submitted && allCorrect && (
                <div className="text-center py-2 bg-gs-light-green text-white rounded-md">
                  Congratulations!
                </div>
              )}
              {submitted && !allCorrect && (
                <button 
                  type="button" 
                  onClick={handleReset}
                  className="w-full px-4 py-2 rounded-md transition duration-300 ease-in-out bg-gs-dark-gray text-white hover:bg-gray-600"
                >
                  Try Again
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CandleLabelingExercise;