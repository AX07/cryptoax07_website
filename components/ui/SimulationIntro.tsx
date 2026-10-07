
import React from 'react';
import Button from './Button';
import { CheckCircleIcon } from '../icons/Icons';
import { useLanguage } from '../../hooks/useLanguage';

interface SimulationIntroProps {
  title: string;
  description: string;
  objectives: string[];
  onStart: () => void;
}

const SimulationIntro: React.FC<SimulationIntroProps> = ({ title, description, objectives, onStart }) => {
  const { t } = useLanguage();
  return (
    <div className="flex flex-col items-center justify-center h-full text-center animate-fade-in p-2 md:p-6">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{title}</h2>
      <p className="text-lg text-brand-text-secondary max-w-2xl mb-8 leading-relaxed">{description}</p>
      
      <div className="bg-brand-surface/50 border border-gray-700 rounded-xl p-6 mb-10 w-full max-w-lg text-left shadow-lg">
        <h3 className="text-lg font-bold text-brand-primary mb-4 uppercase tracking-wider text-center border-b border-gray-700 pb-2">
          {t('simulationIntro.whatYouWillDo')}
        </h3>
        <ul className="space-y-4">
          {objectives.map((obj, index) => (
            <li key={index} className="flex items-start gap-3">
              <div className="bg-brand-secondary/20 p-1 rounded-full mt-0.5">
                <CheckCircleIcon className="h-5 w-5 text-brand-secondary flex-shrink-0" />
              </div>
              <span className="text-white font-medium">{obj}</span>
            </li>
          ))}
        </ul>
      </div>

      <Button onClick={onStart} className="text-lg px-12 py-4 shadow-lg shadow-brand-primary/20 hover:shadow-brand-primary/40 transform transition-all hover:-translate-y-1">
        {t('startLearning')}
      </Button>
    </div>
  );
};

export default SimulationIntro;
