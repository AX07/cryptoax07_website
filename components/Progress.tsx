import React from 'react';
import type { UserProgress } from '../types';
import Card from './ui/Card';
import { CATEGORIES } from '../constants';
import { ShieldCheckIcon } from './icons/Icons';

interface ProgressProps {
  userProgress: UserProgress;
  onBack: () => void;
}

const allSimulations = CATEGORIES.flatMap(cat => cat.simulations);

const Progress: React.FC<ProgressProps> = ({ userProgress, onBack }) => {
  return (
    <div className="animate-fade-in max-w-4xl mx-auto">
      <div className="flex items-center mb-8">
        <button onClick={onBack} className="bg-brand-surface hover:bg-gray-700 text-brand-primary font-bold p-3 rounded-full transition-colors duration-200 mr-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
        </button>
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-white">Your Progress</h2>
          <p className="text-brand-text-secondary">Track your achievements and completed lessons.</p>
        </div>
      </div>
      
      <Card className="p-6 mb-8 text-center bg-gradient-to-r from-brand-surface to-brand-bg">
        <p className="text-sm font-semibold text-yellow-400 uppercase">Total Experience</p>
        <p className="text-6xl font-bold text-white">{userProgress.xp} <span className="text-4xl text-yellow-400">XP</span></p>
      </Card>

      {/* Badges Section */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-white mb-4">Badges Earned</h3>
        {userProgress.badges.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {userProgress.badges.map(badge => (
              <Card key={badge} className="p-4 text-center bg-brand-surface/50">
                <ShieldCheckIcon className="h-12 w-12 text-brand-secondary mx-auto mb-2" />
                <p className="text-sm font-semibold text-white">{badge}</p>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-brand-text-secondary">Complete lessons to earn badges!</p>
        )}
      </div>
      
      {/* Completed Lessons Section */}
      <div>
        <h3 className="text-2xl font-bold text-white mb-4">Completed Lessons</h3>
        {userProgress.completedSimulations.length > 0 ? (
          <div className="space-y-3">
            {userProgress.completedSimulations.map(completedSim => {
              const simDetails = allSimulations.find(s => s.id === completedSim.id);
              if (!simDetails) return null;

              return (
                <Card key={completedSim.id} className="p-4 flex flex-col sm:flex-row justify-between items-center bg-brand-surface/50">
                  <div>
                    <p className="font-bold text-white">{simDetails.title}</p>
                    <p className="text-xs text-brand-text-secondary">
                      Completed on: {new Date(completedSim.completedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <p className="font-bold text-lg text-yellow-400 mt-2 sm:mt-0">+{completedSim.xpGained} XP</p>
                </Card>
              );
            })}
          </div>
        ) : (
          <p className="text-brand-text-secondary">No lessons completed yet. Get started!</p>
        )}
      </div>
    </div>
  );
};

export default Progress;
