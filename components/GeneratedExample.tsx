import React, { useState } from 'react';
import type { GeneratedStep } from '../types';
import Button from './ui/Button';

interface GeneratedExampleProps {
  steps: GeneratedStep[];
}

const GeneratedExample: React.FC<GeneratedExampleProps> = ({ steps }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const step = steps[currentStep];

  return (
    <div className="bg-brand-bg/50 p-4 rounded-lg mt-2 border border-gray-600">
      <div className="flex justify-between items-center mb-3">
        <h4 className="font-bold text-brand-primary">{step.title}</h4>
        <span className="text-xs font-mono text-brand-text-secondary">
          {currentStep + 1} / {steps.length}
        </span>
      </div>
      <p className="text-sm text-brand-text mb-4">{step.content}</p>
      <div className="flex justify-between">
        <Button
          onClick={() => setCurrentStep(prev => prev - 1)}
          disabled={currentStep === 0}
          className="py-1 px-3 text-sm"
          variant="accent"
        >
          Previous
        </Button>
        <Button
          onClick={() => setCurrentStep(prev => prev + 1)}
          disabled={currentStep === steps.length - 1}
          className="py-1 px-3 text-sm"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default GeneratedExample;