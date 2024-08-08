import React from "react";
import { useNavigate } from 'react-router-dom';
import { IoMdClose } from 'react-icons/io';
import person from "../../assets/images/person.svg";

const ModuleTemplate = ({ children, inlineButtonConfigurations, navigationButtonConfigurations }) => {
  const navigate = useNavigate();
  const progress = 2;

  const handleAction = (action) => {
    if (action.type === 'navigate') {
        navigate(action.path);
    } else if (action.type === 'function') {
        action.func();
    } else {
    }
  };

  return (
      <div className="bg-white p-4 mt-2 rounded-lg max-w-7xl mx-auto relative min-h-screen">
          <div className="flex justify-between items-center mb-0">
              <button 
                className="text-lg p-3 hover:bg-gray-200 rounded-md border border-gray-300"
                onClick={() => navigate('/')}
                aria-label="Close module"
              >
                <IoMdClose />
              </button>
              <button 
                className="text-lg p-3 hover:bg-gray-200 rounded-full"
                onClick={() => console.log("Profile options")}
                aria-label="Profile options"
              >
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                  <img src={person} alt="Profile" className="w-6 h-6" />
                </div>
              </button>
          </div> 
          <div className="flex-grow hover:scale-105 transition-transform duration-300">
            <div className="flex justify-between items-center mb-2 max-w-5xl mx-auto">
              <span className="text-sm font-medium text-gs-dark-gray">Lesson 1</span>
              <span className="text-sm font-semibold text-gs-dark-green">{`${progress}%`}</span>
            </div>
            <div className="w-full max-w-5xl bg-gs-light-gray rounded-full h-2 mx-auto"> 
              <div className="bg-gs-dark-green h-2 rounded-full" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
          <div className="my-4 mx-28">
            {children}
            {inlineButtonConfigurations && inlineButtonConfigurations.map(button => (
                <button
                    key={button.key}
                    className={button.className + " block"}
                    onClick={() => handleAction(button.action)}
                >
                    {button.text}
                </button>
            ))}
          </div>
          {navigationButtonConfigurations && (
              <div className="absolute bottom-12 left-0 right-0 flex justify-between max-w-7xl mx-auto px-4">
                  {navigationButtonConfigurations.map(button => (
                      <button
                          key={button.key}
                          className={button.className}
                          onClick={() => handleAction(button.action)}
                      >
                          {button.text}
                      </button>
                  ))}
              </div>
          )}
      </div>
  );
};

export default ModuleTemplate;
