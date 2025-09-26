import React from 'react';
import Card from './ui/Card';
import { useLanguage } from '../hooks/useLanguage';

interface ExpertHelpProps {
  onBack: () => void;
}

const ExpertHelp: React.FC<ExpertHelpProps> = ({ onBack }) => {
  const { t } = useLanguage();

  return (
    <div className="animate-fade-in max-w-4xl mx-auto">
      <div className="flex items-center mb-8">
        <button onClick={onBack} className="bg-brand-surface hover:bg-gray-700 text-brand-primary font-bold p-3 rounded-full transition-colors duration-200 mr-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
        </button>
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-white">{t('expertHelp.title')}</h2>
          <p className="text-brand-text-secondary">{t('expertHelp.subtitle')}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Card className="p-6 text-center">
            <h3 className="text-xl font-bold text-brand-primary mb-2">{t('expertHelp.coachingTitle')}</h3>
            <p className="text-brand-text-secondary">{t('expertHelp.coachingDesc')}</p>
        </Card>
        <Card className="p-6 text-center">
            <h3 className="text-xl font-bold text-brand-primary mb-2">{t('expertHelp.portfolioTitle')}</h3>
            <p className="text-brand-text-secondary">{t('expertHelp.portfolioDesc')}</p>
        </Card>
        <Card className="p-6 text-center">
            <h3 className="text-xl font-bold text-brand-primary mb-2">{t('expertHelp.securityTitle')}</h3>
            <p className="text-brand-text-secondary">{t('expertHelp.securityDesc')}</p>
        </Card>
      </div>
      
      <Card className="p-8 text-center">
        <h3 className="text-2xl font-bold text-white mb-4">{t('expertHelp.ctaTitle')}</h3>
        <p className="text-brand-text-secondary mb-6 max-w-md mx-auto">
          {t('expertHelp.ctaDesc')}
        </p>
        <a 
          href="https://www.cryptoax07.com/challenges" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-block bg-brand-secondary hover:bg-green-400 text-brand-bg font-bold py-3 px-8 rounded-lg transition-colors duration-200 text-lg"
        >
          {t('expertHelp.ctaButton')}
        </a>
      </Card>
    </div>
  );
};

export default ExpertHelp;
