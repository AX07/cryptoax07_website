import React, { useState, useMemo } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Quiz from '../ui/Quiz';
import type { QuizQuestion } from '../../types';

const quizQuestions: QuizQuestion[] = [
    {
        question: "Which of the following is considered an asset?",
        options: [
            { text: "A car loan.", isCorrect: false },
            { text: "Staked crypto that earns you yield.", isCorrect: true },
        ],
        explanation: "An asset puts money in your pocket. Staked crypto earning rewards is an asset. A car loan takes money out of your pocket, making it a liability."
    },
    {
        question: "To improve your financial health and increase your net worth, you should focus on:",
        options: [
            { text: "Acquiring more assets and reducing liabilities.", isCorrect: true },
            { text: "Acquiring more liabilities to get more things.", isCorrect: false },
        ],
        explanation: "The key to building wealth is to increase your assets (income sources) while minimizing your liabilities (expenses and debts)."
    }
];

const initialItems = {
    assets: [
        { id: 'a1', name: 'Staked ETH', value: 7000, monthlyFlow: 25 },
        { id: 'a2', name: 'Bitcoin Holding', value: 15000, monthlyFlow: 0 },
        { id: 'a3', name: 'Savings Account', value: 5000, monthlyFlow: 2 },
    ],
    liabilities: [
        { id: 'l1', name: 'Credit Card Debt', value: 3000, monthlyFlow: -100 },
        { id: 'l2', name: 'Car Loan', value: 12000, monthlyFlow: -400 },
        { id: 'l3', name: 'Subscriptions', value: 0, monthlyFlow: -50 },
    ]
};

const AssetsLiabilitiesSim: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
    const [items, setItems] = useState(initialItems);
    const [showQuiz, setShowQuiz] = useState(false);

    const { netWorth, monthlyCashFlow } = useMemo(() => {
        const totalAssets = items.assets.reduce((sum, item) => sum + item.value, 0);
        const totalLiabilities = items.liabilities.reduce((sum, item) => sum + item.value, 0);
        const assetFlow = items.assets.reduce((sum, item) => sum + item.monthlyFlow, 0);
        const liabilityFlow = items.liabilities.reduce((sum, item) => sum + item.monthlyFlow, 0);
        return {
            netWorth: totalAssets - totalLiabilities,
            monthlyCashFlow: assetFlow + liabilityFlow
        };
    }, [items]);
    
    const handlePayDebt = () => {
        setItems(prev => {
            const newAssets = [...prev.assets];
            const newLiabilities = [...prev.liabilities];
            const savings = newAssets.find(a => a.id === 'a3');
            const debt = newLiabilities.find(l => l.id === 'l1');

            if (savings && debt && savings.value >= 500) {
                savings.value -= 500;
                debt.value -= 500;
                // Simplified: let's assume monthly payment is reduced proportionally
                debt.monthlyFlow += 15; 
            }
            return { assets: newAssets, liabilities: newLiabilities };
        });
    };

    return (
        <Card className="max-w-5xl mx-auto p-6 md:p-8">
            <h2 className="text-3xl font-bold text-center mb-2 text-white">Assets vs. Liabilities</h2>
            <p className="text-brand-text-secondary text-center mb-8 max-w-3xl mx-auto">
                Financially successful people understand one simple rule: acquire assets, not liabilities. This simulation will help you visualize this core concept.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Assets */}
                <div className="bg-brand-secondary/10 p-4 rounded-lg border border-brand-secondary/50">
                    <h3 className="text-2xl font-bold text-brand-secondary mb-4 text-center">ASSETS</h3>
                    <p className="text-sm text-center text-green-300 mb-4">Things that PUT money in your pocket.</p>
                    <div className="space-y-3">
                        {items.assets.map(item => (
                            <Card key={item.id} className="p-3 bg-brand-surface">
                                <div className="flex justify-between items-center">
                                    <span className="font-bold text-white">{item.name}</span>
                                    <span className="font-mono text-white">${item.value.toLocaleString()}</span>
                                </div>
                                <div className="text-right font-mono text-sm text-brand-secondary">+${item.monthlyFlow.toLocaleString()}/mo</div>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Liabilities */}
                 <div className="bg-red-500/10 p-4 rounded-lg border border-red-500/50">
                    <h3 className="text-2xl font-bold text-red-400 mb-4 text-center">LIABILITIES</h3>
                    <p className="text-sm text-center text-red-300 mb-4">Things that TAKE money from your pocket.</p>
                    <div className="space-y-3">
                        {items.liabilities.map(item => (
                            <Card key={item.id} className="p-3 bg-brand-surface">
                                <div className="flex justify-between items-center">
                                    <span className="font-bold text-white">{item.name}</span>
                                    <span className="font-mono text-white">${item.value.toLocaleString()}</span>
                                </div>
                                <div className="text-right font-mono text-sm text-red-400">-${Math.abs(item.monthlyFlow).toLocaleString()}/mo</div>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>

            <Card className="mt-6 p-4 bg-brand-surface text-center">
                <h3 className="text-xl font-bold text-white mb-4">Your Financial Snapshot</h3>
                 <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-sm text-brand-text-secondary">Monthly Net Cash Flow</p>
                        <p className={`text-3xl font-bold ${monthlyCashFlow >= 0 ? 'text-brand-secondary' : 'text-red-400'}`}>
                           {monthlyCashFlow >= 0 ? '+' : '-'}${Math.abs(monthlyCashFlow).toLocaleString()}
                        </p>
                    </div>
                    <div>
                        <p className="text-sm text-brand-text-secondary">Total Net Worth</p>
                        <p className={`text-3xl font-bold ${netWorth >= 0 ? 'text-white' : 'text-red-400'}`}>
                           ${netWorth.toLocaleString()}
                        </p>
                    </div>
                </div>
                <div className="mt-4 border-t border-gray-700 pt-4">
                     <p className="text-sm text-brand-text-secondary mb-2">Try paying down some high-interest debt and see what happens!</p>
                     <Button onClick={handlePayDebt} disabled={items.assets.find(a=>a.id==='a3')?.value < 500}>
                         Use $500 from Savings to Pay Credit Card
                     </Button>
                </div>
            </Card>

            {!showQuiz && (
                <div className="text-center mt-8 border-t border-gray-700 pt-6">
                    <Button onClick={() => setShowQuiz(true)} variant="secondary">
                        I understand, take the quiz
                    </Button>
                </div>
            )}
            {showQuiz && <Quiz questions={quizQuestions} onComplete={onComplete} />}
        </Card>
    );
};

export default AssetsLiabilitiesSim;