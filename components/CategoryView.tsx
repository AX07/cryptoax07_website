
import React from 'react';
import type { Category, Simulation, UserProgress } from '../types';
import Card from './ui/Card';
import { CheckCircleIcon, ExclamationTriangleIcon } from './icons/Icons';
import { useLanguage } from '../hooks/useLanguage';

interface CategoryViewProps {
  category: Category;
  onSelectSimulation: (simulation: Simulation) => void;
  onBack: () => void;
  userProgress: UserProgress;
}

const CategoryView: React.FC<CategoryViewProps> = ({ category, onSelectSimulation, onBack, userProgress }) => {
  const { t } = useLanguage();
  return (
    <div className="animate-fade-in">
      <div className="flex items-center mb-8">
        <button onClick={onBack} className="bg-brand-surface hover:bg-gray-700 text-brand-primary font-bold p-3 rounded-full transition-colors duration-200 mr-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
        </button>
        <div className="flex items-center gap-4">
          <div className="p-3 bg-brand-surface rounded-full">
            <category.icon className="h-8 w-8 text-brand-primary" />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">{category.title}</h2>
            <p className="text-brand-text-secondary">{category.description}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {category.simulations.map((sim) => {
          const isCompleted = userProgress.completedSimulations.some(c => c.id === sim.id);
          const hasBadge = isCompleted || (sim.isSecurityCritical && !isCompleted);
          return (
            <Card
              key={sim.id}
              onClick={() => onSelectSimulation(sim)}
              className={`cursor-pointer group relative overflow-hidden transition-all duration-300 flex flex-col ${isCompleted ? 'border-brand-secondary/50' : sim.isSecurityCritical ? 'border-yellow-500/50 hover:border-yellow-400' : 'hover:border-brand-primary'}`}
            >
              {isCompleted && (
                 <div className="absolute top-3 right-3 flex items-center gap-1 bg-brand-secondary/20 text-brand-secondary text-xs font-bold px-2 py-1 rounded-full z-10">
                   <CheckCircleIcon className="h-4 w-4" />
                   {t('completed')}
                 </div>
              )}
              {sim.isSecurityCritical && !isCompleted && (
                 <div className="absolute top-3 left-3 flex items-center gap-1 bg-yellow-500/20 text-yellow-400 text-xs font-bold px-2 py-1 rounded-full z-10">
                   <ExclamationTriangleIcon className="h-4 w-4" />
                   {t('securityPriority')}
                 </div>
              )}
              <div className={`p-6 flex flex-col flex-grow ${hasBadge ? 'pt-10' : ''}`}>
                <h3 className="text-xl font-bold text-white mb-2">{sim.title}</h3>
                <p className="text-brand-text-secondary mb-4 flex-grow">{sim.description}</p>
                <div className="flex items-center justify-between text-sm mt-auto">
                  <span className="font-semibold text-yellow-400">+{sim.xp} XP</span>
                  {sim.badge && <span className="font-semibold text-brand-secondary">{sim.badge}</span>}
                </div>
              </div>
              <div className={`absolute bottom-0 left-0 h-1 w-full ${sim.isSecurityCritical ? 'bg-yellow-400' : 'bg-brand-primary'} transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300`}></div>
            </Card>
          )
        })}
      </div>
    </div>
  );
};

export default CategoryView;
