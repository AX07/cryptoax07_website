
import React, { useState, useEffect, useCallback } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import SimulationIntro from '../ui/SimulationIntro';
import { useLanguage } from '../../hooks/useLanguage';

const wordList = [
    'apple', 'banana', 'orange', 'grape', 'lemon', 'lime', 'melon', 'peach',
    'pear', 'plum', 'crypto', 'wallet', 'secure', 'phrase', 'backup', 'private',
    'key', 'public', 'address', 'send', 'receive', 'trade', 'learn', 'teach'
];

const generateWords = () => {
  return [...Array(12)].map(() => wordList[Math.floor(Math.random() * wordList.length)]);
};

const shuffle = <T,>(array: T[]): T[] => {
    return array.map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
};

const SeedPhraseSim: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const { t } = useLanguage();
  const [step, setStep] = useState(0); // Start at 0 for Intro
  const [seedPhrase, setSeedPhrase] = useState<string[]>([]);
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);
  const [userSelection, setUserSelection] = useState<string[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const start = useCallback(() => {
    const newWords = generateWords();
    setSeedPhrase(newWords);
    setShuffledOptions(shuffle([...newWords]));
    setUserSelection([]);
    setIsCorrect(null);
    setStep(1);
  }, []);

  // Removed auto-start useEffect to allow intro slide to show first

  const handleVerify = () => {
    const correct = JSON.stringify(userSelection) === JSON.stringify(seedPhrase);
    setIsCorrect(correct);
    if (correct) {
      setTimeout(() => {
        onComplete();
      }, 2000);
    }
  };

  const handleWordSelect = (word: string) => {
    setUserSelection([...userSelection, word]);
  };
  
  const handleWordRemove = (index: number) => {
    setUserSelection(userSelection.filter((_, i) => i !== index));
  };

  return (
    <Card className="max-w-4xl mx-auto p-6 md:p-8">
      {step === 0 ? (
        <SimulationIntro
          title={t('simulations.seedPhrase.title')}
          description={t('simulations.seedPhrase.description')}
          objectives={t('simulations.seedPhrase.objectives')}
          onStart={start}
        />
      ) : (
        <>
          <h2 className="text-3xl font-bold text-center mb-2 text-white">{t('simulations.seedPhrase.title')}</h2>
          <p className="text-brand-text-secondary text-center mb-8 max-w-2xl mx-auto hidden md:block">
            {t('simulations.seedPhrase.description')}
          </p>

          {step === 1 && (
            <div className="text-center animate-fade-in">
              <h3 className="text-xl font-semibold mb-4 text-brand-primary">{t('simulations.seedPhrase.step1Title')}</h3>
              <p className="mb-6 text-brand-text-secondary">{t('simulations.seedPhrase.step1Desc')}</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 bg-brand-bg/50 p-6 rounded-lg border border-gray-700 mb-6">
                {seedPhrase.map((word, index) => (
                  <div key={index} className="flex items-center">
                    <span className="text-brand-text-secondary mr-2 w-6">{index + 1}.</span>
                    <span className="font-mono text-white text-lg">{word}</span>
                  </div>
                ))}
              </div>
              <Button onClick={() => setStep(2)}>{t('simulations.seedPhrase.backedUpButton')}</Button>
            </div>
          )}

          {step === 2 && (
            <div className="animate-fade-in">
              <h3 className="text-xl font-semibold mb-4 text-center text-brand-primary">{t('simulations.seedPhrase.step2Title')}</h3>
              <p className="mb-6 text-center text-brand-text-secondary">{t('simulations.seedPhrase.step2Desc')}</p>
              
              <div className="min-h-[10rem] bg-brand-bg/50 p-4 rounded-lg border border-gray-700 mb-6 flex flex-wrap gap-2 items-start">
                {userSelection.map((word, index) => (
                  <button key={index} onClick={() => handleWordRemove(index)} className="bg-brand-primary text-brand-bg font-mono px-3 py-1 rounded-md text-sm hover:bg-red-500">
                    {word} &times;
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap justify-center gap-3 mb-8">
                 {shuffledOptions.map((word, index) => {
                    const isSelected = userSelection.includes(word);
                    return (
                        <button 
                            key={index}
                            onClick={() => handleWordSelect(word)} 
                            disabled={isSelected}
                            className="bg-brand-surface font-mono px-4 py-2 rounded-md hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                            {word}
                        </button>
                    )
                 })}
              </div>

              <div className="text-center">
                <Button onClick={handleVerify} disabled={userSelection.length !== 12}>{t('simulations.seedPhrase.verifyButton')}</Button>
                {isCorrect === true && <p className="text-brand-secondary mt-4 font-bold">{t('simulations.seedPhrase.correctMessage')}</p>}
                {isCorrect === false && <p className="text-red-500 mt-4 font-bold">{t('simulations.seedPhrase.incorrectMessage')}</p>}
              </div>

              <div className="text-center mt-4">
                  <button onClick={start} className="text-brand-text-secondary hover:text-brand-primary text-sm">{t('simulations.seedPhrase.restart')}</button>
              </div>
            </div>
          )}
        </>
      )}
    </Card>
  );
};

export default SeedPhraseSim;
