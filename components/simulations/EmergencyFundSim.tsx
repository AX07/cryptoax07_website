import React, { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Quiz from '../ui/Quiz';
import type { QuizQuestion } from '../../types';
import { useLanguage } from '../../hooks/useLanguage';

const EmergencyFundSim: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
    const { t } = useLanguage();
    const [monthlyExpenses, setMonthlyExpenses] = useState(2000);
    const [showQuiz, setShowQuiz] = useState(false);
    
    const quizQuestions: QuizQuestion[] = [
        {
            question: "What is the primary purpose of an emergency fund?",
            options: [
                { text: "To invest in high-risk crypto assets.", isCorrect: false },
                { text: "To cover unexpected expenses without going into debt.", isCorrect: true },
            ],
            explanation: "An emergency fund is a safety net for life's unexpected events, like a job loss or medical emergency, ensuring you don't have to sell investments or take on high-interest debt."
        },
        {
            question: "Why are stablecoins often used for building a crypto-based emergency fund?",
            options: [
                { text: "Because their value is designed to be volatile for high returns.", isCorrect: false },
                { text: "Because they are pegged to a stable asset like the US Dollar, minimizing price risk.", isCorrect: true },
            ],
            explanation: "Stablecoins aim to maintain a stable value, which is crucial for an emergency fund that needs to be reliable and not subject to market swings."
        },
        {
            question: "What is an advantage of holding your emergency fund in a DeFi lending protocol compared to a traditional bank?",
            options: [
                { text: "Potentially higher interest rates (APY).", isCorrect: true },
                { text: "It is insured by the government.", isCorrect: false },
            ],
            explanation: "DeFi protocols can often offer higher yields than traditional savings accounts. However, it's important to understand the associated risks, as they are not government-insured."
        }
    ];

    const targetFund = monthlyExpenses * 6;
    const traditionalApy = 0.5;
    const defiApy = 5.0;

    const traditionalEarnings = targetFund * (traditionalApy / 100);
    const defiEarnings = targetFund * (defiApy / 100);

    return (
        <Card className="max-w-4xl mx-auto p-6 md:p-8">
            <h2 className="text-3xl font-bold text-center mb-2 text-white">{t('simulations.emergencyFund.title')}</h2>
            <p className="text-brand-text-secondary text-center mb-8 max-w-2xl mx-auto">
                {t('simulations.emergencyFund.description')}
            </p>

            <div className="grid lg:grid-cols-2 gap-8 items-center">
                {/* Calculator */}
                <Card className="p-6 bg-brand-bg/50">
                    <h3 className="text-xl font-semibold text-white mb-4">{t('simulations.emergencyFund.calculatorTitle')}</h3>
                    <div className="mb-4">
                        <label className="block font-semibold mb-2">{t('simulations.emergencyFund.monthlyExpenses')}</label>
                        <div className="flex items-center">
                            <span className="text-2xl mr-2">$</span>
                            <input
                                type="number"
                                value={monthlyExpenses}
                                onChange={e => setMonthlyExpenses(parseInt(e.target.value) || 0)}
                                className="w-full bg-brand-bg border border-gray-600 rounded-lg p-3 text-2xl"
                            />
                        </div>
                    </div>
                    <div className="text-center bg-brand-surface p-4 rounded-lg">
                        <p className="text-brand-text-secondary">{t('simulations.emergencyFund.goal')}</p>
                        <p className="text-4xl font-bold text-brand-primary">${targetFund.toLocaleString()}</p>
                    </div>
                </Card>

                {/* Comparison */}
                <Card className="p-6 bg-brand-bg/50">
                    <h3 className="text-xl font-semibold text-white mb-4">{t('simulations.emergencyFund.comparisonTitle')}</h3>
                    <p className="text-sm text-brand-text-secondary mb-4">{t('simulations.emergencyFund.comparisonDesc')}</p>
                    <div className="space-y-4">
                        <div className="p-3 bg-brand-surface rounded-lg">
                            <p className="font-bold text-white">{t('simulations.emergencyFund.traditionalBank')}</p>
                            <p className="text-sm text-brand-text-secondary">{t('simulations.emergencyFund.apy')} {traditionalApy}%</p>
                            <p className="text-lg font-bold text-red-400">{t('simulations.emergencyFund.annualEarnings')}: ${traditionalEarnings.toFixed(2)}</p>
                        </div>
                        <div className="p-3 bg-brand-surface rounded-lg border-2 border-brand-secondary">
                            <p className="font-bold text-white">{t('simulations.emergencyFund.defiProtocol')}</p>
                            <p className="text-sm text-brand-text-secondary">{t('simulations.emergencyFund.apy')} {defiApy}%</p>
                            <p className="text-lg font-bold text-brand-secondary">{t('simulations.emergencyFund.annualEarnings')}: ${defiEarnings.toFixed(2)}</p>
                        </div>
                    </div>
                </Card>
            </div>

            {!showQuiz && (
                <div className="text-center mt-8 border-t border-gray-700 pt-6">
                    <Button onClick={() => setShowQuiz(true)} variant="secondary">
                        {t('simulations.emergencyFund.quizButton')}
                    </Button>
                </div>
            )}

            {showQuiz && <Quiz questions={quizQuestions} onComplete={onComplete} />}
        </Card>
    );
};

export default EmergencyFundSim;
