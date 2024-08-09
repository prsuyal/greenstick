import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { IoMdClose } from 'react-icons/io';
import axios from 'axios';
import ExoLogo from '../../assets/images/thinexologo.svg';

const ModuleTemplate = ({
  children, 
  title, 
  lessonId,
  userId,
  totalSteps, 
  nextLessonPath,
  previousLessonPath,
  onNext,
  onPrevious,
  isContinueDisabled,
  onStepChange,
  currentStep: parentCurrentStep,
  levelNumber,
  sublevelLetter,
  lessonNumber
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState(0);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("Fetching user and progress data...");
    const fetchUserAndProgress = async () => {
      try {
        const lessonId = `${levelNumber}-${sublevelLetter}-${lessonNumber}`;
        const [userResponse, progressResponse] = await Promise.all([
          axios.get(`http://localhost:3001/api/users/${userId}`),
          axios.get(`http://localhost:3001/api/progress/${userId}/${lessonId}`)
        ]);
        setUser(userResponse.data);
        const savedProgress = progressResponse.data.progress;
        console.log('Fetched progress:', savedProgress);
        const stepNumber = Math.floor((savedProgress / 100) * totalSteps);
        setCurrentStep(stepNumber);
        onStepChange && onStepChange(stepNumber);
      } catch (error) {
        console.error('Error fetching user data or progress:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserAndProgress();
  }, [userId, levelNumber, sublevelLetter, lessonNumber]);

  const handleNext = async () => {
    console.log("Current step before increment:", currentStep);
    if (currentStep < totalSteps - 1) {
      const newStep = currentStep + 1;
      setCurrentStep(newStep);
      await saveProgress(newStep);
      onNext && onNext(newStep);
      onStepChange && onStepChange(newStep);
    } else if (nextLessonPath) {
      navigate(nextLessonPath);
    }
  };

  const handlePrevious = async () => {
    console.log("Current step before decrement:", currentStep);
    if (currentStep > 0) {
      const newStep = currentStep - 1;
      setCurrentStep(newStep);
      await saveProgress(newStep);
      onPrevious && onPrevious(newStep);
      onStepChange && onStepChange(newStep);
    } else if (previousLessonPath) {
      navigate(previousLessonPath);
    }
  };

  const saveProgress = async (step) => {
    const progressPercentage = Math.round((step / totalSteps) * 100);
    console.log('Saving progress:', { userId, lessonId: `${levelNumber}-${sublevelLetter}-${lessonNumber}`, progress: progressPercentage, title, levelNumber, sublevelLetter, lessonNumber});
    try {
      await axios.post('http://localhost:3001/api/progress/update-progress', {
        userId,
        lessonId: `${levelNumber}-${sublevelLetter}-${lessonNumber}`,
        progress: progressPercentage,
        title,
        levelNumber,
        sublevelLetter,
        lessonNumber,
      });
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const childrenArray = React.Children.toArray(children);

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
        <div className="flex items-center">
          <span className="text-sm font-medium text-gs-dark-gray mr-2">{`${Math.round((currentStep / totalSteps) * 100)}%`}</span>
          <div className="w-96 bg-gs-light-gray rounded-full h-2">
            <div 
              className="bg-gs-dark-green h-2 rounded-full" 
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>
        <Link to="/exo" className="w-8 h-8">
          <img src={ExoLogo} alt="Exo" className="w-full h-full" />
        </Link>
      </div>
      <h1 className="text-4xl font-bold mb-6">{title}</h1>
      <div className="text-lg leading-relaxed space-y-6">
        {childrenArray.slice(0, currentStep + 1).map((child, index) =>
          React.cloneElement(child, { user, key: index })
        )}
      </div>
      <div className="mt-8 flex justify-between">
        <button
          className={`bg-gs-light-gray text-gs-dark-gray font-bold py-2 px-6 z-10 rounded-md hover:bg-gray-300 transition-colors duration-300 ${currentStep === 0 ? 'invisible' : ''}`}
          onClick={handlePrevious}
          disabled={currentStep === 0}
        >
          Previous
        </button>
        <button
          className="bg-gs-dark-green text-white font-bold py-2 px-6 z-10 rounded-md transition-colors duration-300 hover:bg-gs-light-green"
          onClick={handleNext}
          disabled={isContinueDisabled}
        >
          {currentStep === totalSteps - 1 ? 'Finish' : 'Continue'}
        </button>
      </div>
    </div>
  );
};

export default ModuleTemplate;