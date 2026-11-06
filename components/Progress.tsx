import React from 'react';
import type { UserProgress } from '../types';
import Card from './ui/Card';
import { GET_CATEGORIES } from '../constants';
import { ShieldCheckIcon, StarIcon, PhoneIcon, CheckCircleIcon } from './icons/Icons';
import { ContributionCalendar } from './ui/ContributionCalendar';
import { useLanguage } from '../hooks/useLanguage';
import Button from './ui/Button';

interface ProgressProps {
  userProgress: UserProgress;
  onBack: () => void;
  onOpenBookingModal: () => void;
  onContinueLearning: () => void;
}

const Progress: React.FC<ProgressProps> = ({ userProgress, onBack, onOpenBookingModal, onContinueLearning }) => {
  const { t } = useLanguage();
  const allSimulations = GET_CATEGORIES(t).flatMap(cat => cat.simulations);
  const totalSimulations = allSimulations.length;
  const completedCount = userProgress.completedSimulations.length;
  
  return (
    <div className="animate-fade-in max-w-4xl mx-auto">
      <div className="flex items-center mb-8">
        <button onClick={onBack} className="bg-brand-surface hover:bg-gray-700 text-brand-primary font-bold p-3 rounded-full transition-colors duration-200 mr-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
        </button>
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-white">{t('progressPage.yourProgress')}</h2>
          <p className="text-brand-text-secondary">{t('progressPage.description')}</p>
        </div>
      </div>
      
      {userProgress.hasBookedCall ? (
        <Card className="p-6 mb-8 bg-gradient-to-r from-brand-secondary/10 to-brand-surface border border-brand-secondary/50 text-center">
          <CheckCircleIcon className="h-10 w-10 text-brand-secondary mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">{t('progressPage.callBookedTitle')}</h3>
          <p className="text-brand-text-secondary mb-6 max-w-xl mx-auto">
            {t('progressPage.callBookedDesc')}
          </p>
          <Button onClick={onOpenBookingModal}>
            {t('progressPage.rescheduleButton')}
          </Button>
        </Card>
      ) : (
        <Card className="p-6 mb-8 bg-gradient-to-r from-brand-primary/10 to-brand-surface border border-brand-primary/50 text-center">
          <PhoneIcon className="h-10 w-10 text-brand-primary mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">{t('progressPage.bookCallTitle')}</h3>
          <p className="text-brand-text-secondary mb-6 max-w-xl mx-auto">
            {t('progressPage.bookCallDesc')}
          </p>
          <Button onClick={onOpenBookingModal} className="btn-glow-blue">
            {t('progressPage.bookCallButton')}
          </Button>
        </Card>
      )}

      {completedCount < totalSimulations && (
        <Card className="p-4 mb-8 text-center bg-brand-orange/10 border border-brand-orange/50 animate-fade-in">
          <div className="flex items-center justify-center gap-2">
            <StarIcon className="h-5 w-5 text-brand-orange" />
            <p className="font-semibold text-brand-orange">
                {t('rewards.completionReward')}
            </p>
          </div>
        </Card>
      )}

      <Card className="p-6 mb-8 text-center bg-gradient-to-r from-brand-surface to-brand-bg">
        <p className="text-sm font-semibold text-yellow-400 uppercase">{t('progressPage.totalExperience')}</p>
        <p className="text-6xl font-bold text-white">{userProgress.xp} <span className="text-4xl text-yellow-400">XP</span></p>
      </Card>

      <div className="text-center mb-8">
        <Button onClick={onContinueLearning} className="text-lg py-3 px-8">
            {t('progressPage.continueLearning')}
        </Button>
      </div>

      <div className="mb-8">
        <ContributionCalendar completedSimulations={userProgress.completedSimulations} />
      </div>

      {/* Badges Section */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-white mb-4">{t('progressPage.badgesEarned')}</h3>
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
          <p className="text-brand-text-secondary">{t('progressPage.noBadges')}</p>
        )}
      </div>
      
      {/* Completed Lessons Section */}
      <div>
        <h3 className="text-2xl font-bold text-white mb-4">{t('progressPage.completedLessons')}</h3>
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
                      {t('progressPage.completedOn')}: {new Date(completedSim.completedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <p className="font-bold text-lg text-yellow-400 mt-2 sm:mt-0">+{completedSim.xpGained} XP</p>
                </Card>
              );
            })}
          </div>
        ) : (
          <p className="text-brand-text-secondary">{t('progressPage.noLessons')}</p>
        )}
      </div>
    </div>
  );
};

export default React.memo(Progress);