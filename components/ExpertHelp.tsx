
import React from 'react';
import Card from './ui/Card';

interface ExpertHelpProps {
  onBack: () => void;
}

const ExpertHelp: React.FC<ExpertHelpProps> = ({ onBack }) => {
  return (
    <div className="animate-fade-in max-w-4xl mx-auto">
      <div className="flex items-center mb-8">
        <button onClick={onBack} className="bg-brand-surface hover:bg-gray-700 text-brand-primary font-bold p-3 rounded-full transition-colors duration-200 mr-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
        </button>
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-white">Expert Crypto Guidance</h2>
          <p className="text-brand-text-secondary">Navigate the world of crypto with confidence. Our experts are here to help.</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Card className="p-6 text-center">
            <h3 className="text-xl font-bold text-brand-primary mb-2">1-on-1 Coaching</h3>
            <p className="text-brand-text-secondary">Personalized sessions to guide you through any crypto topic, from wallet setup to advanced DeFi strategies.</p>
        </Card>
        <Card className="p-6 text-center">
            <h3 className="text-xl font-bold text-brand-primary mb-2">Portfolio Review</h3>
            <p className="text-brand-text-secondary">Get a professional analysis of your crypto holdings and strategies for diversification and risk management.</p>
        </Card>
        <Card className="p-6 text-center">
            <h3 className="text-xl font-bold text-brand-primary mb-2">Security Audit</h3>
            <p className="text-brand-text-secondary">Our experts will review your security practices to ensure your digital assets are protected from threats.</p>
        </Card>
      </div>
      
      <Card className="p-8 text-center">
        <h3 className="text-2xl font-bold text-white mb-4">Ready for the Next Step?</h3>
        <p className="text-brand-text-secondary mb-6 max-w-md mx-auto">
          Book a free discovery call to discuss your learning goals and see how our tailored coaching can help you succeed.
        </p>
        <a 
          href="https://www.cryptoax07.com/challenges" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-block bg-brand-secondary hover:bg-green-400 text-brand-bg font-bold py-3 px-8 rounded-lg transition-colors duration-200 text-lg"
        >
          Get Tailored Education
        </a>
      </Card>
    </div>
  );
};

export default ExpertHelp;