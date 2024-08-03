import React from 'react';

const ProgressBar = ({ currentStep }) => {
  const steps = [
    { label: 'ChatBot Info', number: 1 },
    { label: 'File Upload', number: 2 },
    { label: 'Api Key', number: 3 },
  ];

  return (
    <div className="flex items-center justify-center space-x-4  w-[550px]">
      {steps.map((step, index) => (
        <React.Fragment key={step.number}>
          <div className="flex flex-col items-center">
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full ${
                index < currentStep
                  ? 'bg-green-500 text-white'
                  : index === currentStep
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-700 text-gray-400'
              }`}
            >
              {index < currentStep ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                step.number
              )}
            </div>
            <span className="ml-2 text-sm text-white mt-4">{step.label}</span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={`flex-1 h-0.5 ${
                index < currentStep - 1 ? 'bg-green-500' : 'bg-gray-700'
              }`}
            />
          )}
        
        </React.Fragment>
      ))}
      
    </div>
  );
};


export default ProgressBar