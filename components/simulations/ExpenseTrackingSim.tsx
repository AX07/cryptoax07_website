import React, { useState, useMemo } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Quiz from '../ui/Quiz';
import type { QuizQuestion } from '../../types';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useLanguage } from '../../hooks/useLanguage';

const ExpenseTrackingSim: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
    const { t } = useLanguage();
    const [showQuiz, setShowQuiz] = useState(false);
    
    const INITIAL_EXPENSES = useMemo(() => [
        { name: t('simulations.expenseTracking.expenseItems.housing'), value: 1200, color: '#38BDF8' },
        { name: t('simulations.expenseTracking.expenseItems.transportation'), value: 300, color: '#34D399' },
        { name: t('simulations.expenseTracking.expenseItems.food'), value: 400, color: '#F472B6' },
        { name: t('simulations.expenseTracking.expenseItems.utilities'), value: 150, color: '#FBBF24' },
        { name: t('simulations.expenseTracking.expenseItems.subscriptions'), value: 50, color: '#A78BFA' },
        { name: t('simulations.expenseTracking.expenseItems.other'), value: 200, color: '#94A3B8' },
    ], [t]);

    const [expenses, setExpenses] = useState(INITIAL_EXPENSES);
    
    const quizQuestions: QuizQuestion[] = [
        {
            question: "What is a 'liability' in personal finance?",
            options: [
                { text: "Something you own that is likely to increase in value.", isCorrect: false },
                { text: "A financial obligation or something you owe, like a recurring bill.", isCorrect: true },
            ],
            explanation: "Liabilities are debts or financial obligations. Common examples include rent, loan payments, and subscription fees. Understanding them is key to managing your money."
        },
        {
            question: "Why is it important to track your expenses?",
            options: [
                { text: "To know where your money is going and identify areas where you can save.", isCorrect: true },
                { text: "It's required by law for all individuals.", isCorrect: false },
            ],
            explanation: "Tracking expenses gives you a clear picture of your spending habits, empowering you to create a budget, save more effectively, and achieve your financial goals."
        }
    ];

    const handleExpenseChange = (index: number, newValue: number) => {
        const newExpenses = [...expenses];
        newExpenses[index].value = newValue;
        setExpenses(newExpenses);
    };
    
    const totalLiabilities = useMemo(() => expenses.reduce((sum, item) => sum + item.value, 0), [expenses]);
    const chartData = useMemo(() => expenses.filter(e => e.value > 0), [expenses]);

    return (
        <Card className="max-w-5xl mx-auto p-6 md:p-8">
            <h2 className="text-3xl font-bold text-center mb-2 text-white">{t('simulations.expenseTracking.title')}</h2>
            <p className="text-brand-text-secondary text-center mb-8 max-w-3xl mx-auto">
                {t('simulations.expenseTracking.description')}
            </p>

            <div className="grid lg:grid-cols-2 gap-8">
                {/* Inputs */}
                <div className="bg-brand-bg/50 p-4 rounded-lg">
                    <h3 className="text-xl font-semibold text-white mb-4">{t('simulations.expenseTracking.expensesTitle')}</h3>
                    <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                    {expenses.map((expense, index) => (
                        <div key={index} className="flex items-center justify-between gap-4">
                            <label className="text-sm font-medium text-brand-text-secondary flex-1">{expense.name}</label>
                            <div className="flex items-center w-32">
                                <span className="mr-1">$</span>
                                <input
                                    type="number"
                                    value={expense.value}
                                    onChange={e => handleExpenseChange(index, parseInt(e.target.value) || 0)}
                                    className="w-full bg-brand-bg border border-gray-600 rounded-md p-1"
                                />
                            </div>
                        </div>
                    ))}
                    </div>
                </div>
                
                {/* Visualization */}
                <div className="flex flex-col gap-4">
                    <Card className="p-4 text-center bg-brand-surface">
                        <p className="text-sm text-brand-text-secondary">{t('simulations.expenseTracking.totalLiabilities')}</p>
                        <p className="text-4xl font-bold text-red-400">${totalLiabilities.toLocaleString()}</p>
                    </Card>
                    <div className="h-64 w-full">
                        <ResponsiveContainer>
                            <PieChart>
                                <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                                    {chartData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                                </Pie>
                                <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {!showQuiz && (
                <div className="text-center mt-8 border-t border-gray-700 pt-6">
                    <Button onClick={() => setShowQuiz(true)} variant="secondary">
                        {t('simulations.expenseTracking.quizButton')}
                    </Button>
                </div>
            )}
            {showQuiz && <Quiz questions={quizQuestions} onComplete={onComplete} />}
        </Card>
    );
};

export default ExpenseTrackingSim;
