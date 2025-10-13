import React from 'react';
import type { UserProgress, Category } from '../types';
import Button from './ui/Button';
import Card from './ui/Card';
import { GET_CATEGORIES, LEARNING_PATH } from '../constants';
import { useLanguage } from '../hooks/useLanguage';
import { StarIcon } from './icons/Icons';

interface DashboardProps {
  onStartLearning: () => void;
  onSelectCategory: (category: Category) => void;
  userProgress: UserProgress;
}

const Dashboard: React.FC<DashboardProps> = ({ onStartLearning, onSelectCategory, userProgress }) => {
  const { t } = useLanguage();
  const CATEGORIES = GET_CATEGORIES(t);
  const totalSimulations = LEARNING_PATH.length;
  const completedCount = userProgress.completedSimulations.length;
  const overallProgressPercentage = totalSimulations > 0 ? Math.round((completedCount / totalSimulations) * 100) : 0;
  const isStarted = completedCount > 0 && completedCount < totalSimulations;

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-10">
        <h2 className="text-4xl md:text-5xl font-bold text-white">{t('dashboard.welcome')}</h2>
        <p className="mt-4 text-lg text-brand-text-secondary max-w-2xl mx-auto">
          {t('dashboard.description')}
        </p>
      </div>

      <div className="w-full max-w-3xl mx-auto mb-10 bg-brand-surface p-6 rounded-xl border border-gray-700/50">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-semibold text-white">{t('dashboard.learningProgress')}</h3>
          <span className="text-brand-primary font-bold">{overallProgressPercentage}% {t('app.complete')}</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-4">
          <div 
            className="bg-brand-primary h-4 rounded-full transition-all duration-500"
            style={{ width: `${overallProgressPercentage}%` }}
          ></div>
        </div>
        <p className="text-xs text-brand-text-secondary text-right mt-1">{completedCount} / {totalSimulations} {t('dashboard.lessonsCompleted')}</p>
        
        {overallProgressPercentage < 100 && (
          <div className="mt-4 text-center p-3 bg-brand-orange/10 border border-brand-orange/50 rounded-lg animate-fade-in flex items-center justify-center gap-2">
            <StarIcon className="h-5 w-5 text-brand-orange" />
            <p className="font-semibold text-brand-orange">
              {t('rewards.completionReward')}
            </p>
          </div>
        )}

      </div>

      <div className="text-center mb-12">
        <Button onClick={onStartLearning} className="text-xl py-4 px-10">
          {isStarted ? t('dashboard.resumeLearning') : t('startLearning')}
        </Button>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-center text-white mb-6">{t('dashboard.exploreByCategory')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((category) => {
            const totalSimsInCategory = category.simulations.length;
            const completedSimIds = new Set(userProgress.completedSimulations.map(s => s.id));
            const completedSimsInCategory = category.simulations.filter(sim => completedSimIds.has(sim.id)).length;
            const progressPercentage = totalSimsInCategory > 0 ? Math.round((completedSimsInCategory / totalSimsInCategory) * 100) : 0;
            
            return (
              <Card
                key={category.id}
                onClick={() => onSelectCategory(category)}
                className="cursor-pointer group hover:border-brand-primary transition-all duration-300 flex flex-col"
              >
                <div className="p-6 text-center flex-grow">
                  <div className="inline-block p-4 bg-brand-surface rounded-full mb-4 group-hover:bg-brand-primary/20 transition-colors">
                    <category.icon className="h-10 w-10 text-brand-primary group-hover:text-sky-300" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{category.title}</h3>
                  <p className="text-sm text-brand-text-secondary">{category.description}</p>
                </div>
                {totalSimsInCategory > 0 && (
                  <div className="px-6 pb-6 mt-auto">
                    <div className="flex justify-between items-center mb-1 text-xs">
                      <span className="font-semibold text-brand-text-secondary">{t('dashboard.progress')}</span>
                      <span className="font-bold text-brand-primary">{progressPercentage}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-brand-primary h-2 rounded-full transition-all duration-500"
                        style={{ width: `${progressPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  );
};

export default React.memo(Dashboard);