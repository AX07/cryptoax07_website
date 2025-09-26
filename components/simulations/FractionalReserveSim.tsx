import React, { useState, useMemo } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Quiz from '../ui/Quiz';
import type { QuizQuestion } from '../../types';
import { useLanguage } from '../../hooks/useLanguage';

const FractionalReserveSim: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const { t } = useLanguage();
  const [reserveRatio, setReserveRatio] = useState(10);
  const [step, setStep] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const initialDeposit = 1000;

  const quizQuestions: QuizQuestion[] = [
    {
        question: "In a fractional reserve system, when a bank receives a new deposit, what must it do?",
        options: [
            { text: "Lend out the entire amount.", isCorrect: false },
            { text: "Keep a fraction as reserves and lend out the rest.", isCorrect: true },
        ],
        explanation: "Banks are required to hold a specific fraction of deposits (the reserve requirement) and can lend out the remainder."
    },
    {
        question: "How does this system 'create' new money?",
        options: [
            { text: "By physically printing more bills.", isCorrect: false },
            { text: "Through the process of lending and re-depositing the same money multiple times.", isCorrect: true },
        ],
        explanation: "The cycle of lending, spending, and re-depositing expands the total money supply beyond the initial physical cash deposit."
    },
    {
        question: "If the reserve ratio is 20% (0.2), what is the maximum amount of money supply that can be created from an initial deposit of $1,000?",
        options: [
            { text: "$2,000", isCorrect: false },
            { text: "$5,000", isCorrect: true },
        ],
        explanation: "The money multiplier is 1 / Reserve Ratio (1 / 0.2 = 5). So, $1,000 x 5 = $5,000."
    }
];

  const steps = useMemo(() => {
    const calculatedSteps = [];
    let currentDeposit = initialDeposit;
    let totalMoney = initialDeposit;
    let newMoney = 0;

    for (let i = 0; i < 5; i++) {
      if (currentDeposit < 1) break;
      const reserve = currentDeposit * (reserveRatio / 100);
      const loan = currentDeposit - reserve;
      newMoney += loan;
      totalMoney += loan;
      calculatedSteps.push({
        round: i + 1,
        deposit: currentDeposit,
        reserve: reserve,
        loan: loan,
        newMoney: newMoney,
        totalMoney: totalMoney,
      });
      currentDeposit = loan;
    }
    return calculatedSteps;
  }, [reserveRatio]);

  const moneyMultiplier = 1 / (reserveRatio / 100);
  const maxMoneySupply = initialDeposit * moneyMultiplier;

  return (
    <Card className="max-w-4xl mx-auto p-6 md:p-8">
      <h2 className="text-3xl font-bold text-center mb-2 text-white">{t('simulations.fractionalReserve.title')}</h2>
      <p className="text-brand-text-secondary text-center mb-8 max-w-2xl mx-auto">
        {t('simulations.fractionalReserve.description')}
      </p>

      <div className="grid lg:grid-cols-2 gap-8 items-start">
        {/* Controls and Explanation */}
        <div className="bg-brand-bg/50 p-4 rounded-lg">
          <h3 className="text-xl font-semibold text-white mb-4">{t('simulations.fractionalReserve.controlsTitle')}</h3>
          <div className="mb-6">
            <label className="block font-semibold mb-2">{t('simulations.fractionalReserve.reserveRatio')} <span className="text-brand-primary font-mono">{reserveRatio}%</span></label>
            <p className="text-xs text-brand-text-secondary mb-2">{t('simulations.fractionalReserve.reserveRatioDesc')}</p>
            <input
              type="range"
              min="5"
              max="50"
              step="5"
              value={reserveRatio}
              onChange={e => {
                setReserveRatio(parseInt(e.target.value));
                setStep(0);
              }}
              className="w-full"
            />
          </div>
          <div className="text-center space-y-2">
            <p className="text-brand-text-secondary">{t('simulations.fractionalReserve.multiplier')}</p>
            <p className="text-2xl font-bold text-brand-primary">{moneyMultiplier.toFixed(1)}x</p>
            <p className="text-brand-text-secondary mt-2">{t('simulations.fractionalReserve.maxSupply', { initialDeposit: initialDeposit })}</p>
            <p className="text-2xl font-bold text-brand-secondary">${maxMoneySupply.toLocaleString()}</p>
          </div>
        </div>

        {/* Visualization */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4 text-center">{t('simulations.fractionalReserve.cycleTitle')}</h3>
          <div className="space-y-2">
            <div className="p-3 bg-brand-surface rounded-lg text-center">
              {t('simulations.fractionalReserve.initialDeposit')} <span className="font-bold text-white">${initialDeposit.toLocaleString()}</span>
            </div>
            {steps.slice(0, step).map((s, index) => (
              <Card key={index} className="p-3 bg-brand-bg/50 animate-fade-in">
                <p className="font-bold text-brand-primary">{t('simulations.fractionalReserve.round')} {s.round}</p>
                <div className="text-sm space-y-1 mt-1">
                  <p>{t('simulations.fractionalReserve.bankReceives')} <span className="font-mono text-white">${s.deposit.toFixed(2)}</span></p>
                  <p>{t('simulations.fractionalReserve.holdsInReserve', { reserveRatio: reserveRatio })} <span className="font-mono text-yellow-400">${s.reserve.toFixed(2)}</span></p>
                  <p>{t('simulations.fractionalReserve.lendsOut')} <span className="font-mono text-green-400">${s.loan.toFixed(2)}</span></p>
                </div>
              </Card>
            ))}
          </div>
          {step < steps.length && (
            <div className="text-center mt-4">
              <Button onClick={() => setStep(s => s + 1)}>{t('simulations.fractionalReserve.nextRound')}</Button>
            </div>
          )}
        </div>
      </div>
      
      <Card className="mt-8 p-4 bg-brand-surface text-center">
        <h3 className="text-lg font-bold text-white">{t('simulations.fractionalReserve.summaryTitle')}</h3>
        <div className="grid grid-cols-3 gap-4 mt-2">
            <div>
                <p className="text-sm text-brand-text-secondary">{t('simulations.fractionalReserve.initialDeposit')}</p>
                <p className="text-xl font-bold text-white">${initialDeposit.toLocaleString()}</p>
            </div>
            <div>
                <p className="text-sm text-brand-text-secondary">{t('simulations.fractionalReserve.newMoney')}</p>
                <p className="text-xl font-bold text-brand-secondary">${(step > 0 ? steps[step - 1].newMoney : 0).toFixed(2)}</p>
            </div>
            <div>
                <p className="text-sm text-brand-text-secondary">{t('simulations.fractionalReserve.totalMoney')}</p>
                <p className="text-xl font-bold text-brand-primary">${(step > 0 ? steps[step - 1].totalMoney : initialDeposit).toFixed(2)}</p>
            </div>
        </div>
      </Card>

      {!showQuiz && step > 0 && (
          <div className="text-center mt-6">
              <Button onClick={() => setShowQuiz(true)} variant="secondary">{t('simulations.fractionalReserve.quizButton')}</Button>
          </div>
      )}

      {showQuiz && <Quiz questions={quizQuestions} onComplete={onComplete} />}
    </Card>
  );
};

export default FractionalReserveSim;
